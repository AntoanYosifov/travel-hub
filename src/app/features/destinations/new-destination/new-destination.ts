import { Component, OnInit, Signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DestinationsService } from '../../../core/services/destinations.service';
import { Router } from '@angular/router';
import { Destination } from '../../../models/destination.model';
import { AuthService } from '../../../core/services/auth.service';
import { UserModel } from '../../../models/user.model';
import { Title } from '@angular/platform-browser';

import { Storage, ref, uploadBytesResumable, getDownloadURL } from '@angular/fire/storage';

@Component({
    selector: 'app-new-destination',
    imports: [ReactiveFormsModule],
    templateUrl: './new-destination.html',
    standalone: true,
    styleUrl: './new-destination.css'
})
export class NewDestination implements OnInit {

    form: FormGroup;
    readonly profile: Signal<UserModel | null>;

    selectedFile: File | null = null;
    previewUrl: string | null = null;
    uploading = false;
    uploadProgress = 0;
    fileError: string | null = null;

    constructor(
      private formBuilder: FormBuilder,
      private destinationService: DestinationsService,
      private router: Router,
      private authService: AuthService,
      private title: Title,
      private storage: Storage
    ) {
        this.profile = this.authService.profileSignal;

        this.form = this.formBuilder.group({
            locationName: ['', [Validators.required, Validators.minLength(4)]],
            description:   ['', [Validators.required, Validators.minLength(10)]]
        });
    }

    ngOnInit(): void {
        this.title.setTitle('New Destination');
    }

    get locationName(): AbstractControl<any, any> | null { return this.form.get('locationName'); }
    get description(): AbstractControl<any, any> | null { return this.form.get('description'); }

    get isLocationNameNotValid(): boolean {
        return this.locationName?.invalid && (this.locationName?.dirty || this.locationName?.touched) || false;
    }
    get isDescriptionNotValid(): boolean {
        return this.description?.invalid && (this.description?.dirty || this.description?.touched) || false;
    }

    get locationNameErrorMessage(): string {
        if (this.locationName?.errors?.['required']) return 'Location name is required!';
        if (this.locationName?.errors?.['minlength']) return 'Minimum of 4 characters!';
        return '';
    }
    get descriptionErrorMessage(): string {
        if (this.description?.errors?.['required']) return 'Description is required!';
        if (this.description?.errors?.['minlength']) return 'Minimum of 10 characters!';
        return '';
    }

    onFileSelected(e: Event) {
        this.fileError = null;
        const input = e.target as HTMLInputElement;
        const file  = input.files?.[0] ?? null;

        if (!file) {
            this.selectedFile = null;
            if (this.previewUrl) URL.revokeObjectURL(this.previewUrl);
            this.previewUrl = null;
            return;
        }

        if (!file.type.startsWith('image/')) {
            this.fileError = 'Please select an image file.';
            return;
        }
        const maxMB = 5;
        if (file.size > maxMB * 1024 * 1024) {
            this.fileError = `Image must be ≤ ${maxMB}MB.`;
            return;
        }

        this.selectedFile = file;
        if (this.previewUrl) URL.revokeObjectURL(this.previewUrl);
        this.previewUrl = URL.createObjectURL(file);
    }

    private async uploadImageOrThrow(uid: string): Promise<{ url: string; path: string }> {
        if (!this.selectedFile) throw new Error('Please select an image.');

        const file = this.selectedFile;
        const path = `destinations/${uid}/${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
        const storageRef = ref(this.storage, path);

        this.uploading = true;
        this.uploadProgress = 0;

        const task = uploadBytesResumable(storageRef, file, { contentType: file.type });

        await new Promise<void>((resolve, reject) => {
            task.on('state_changed',
              (snap) => {
                  if (snap.totalBytes) {
                      this.uploadProgress = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
                  }
              },
              (err) => reject(err),
              () => resolve()
            );
        });

        const url = await getDownloadURL(storageRef);
        this.uploading = false;
        return { url, path };
    }

    async onSubmit(): Promise<void> {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        const currentUser = this.profile();
        if (!currentUser) {
            console.error('No logged-in user');
            return;
        }

        try {
            const { url, path } = await this.uploadImageOrThrow(currentUser.uid);

            const v = this.form.getRawValue();
            const data: Omit<Destination, 'id'> = {
                locationName: v.locationName,
                description:  v.description,
                imgUrl: url,
                authorId: currentUser.uid,
                authorName: currentUser.displayName,
                storagePath: path
            };

            this.destinationService.addDestination(data).subscribe({
                next: (created: Destination) => this.router.navigate(['/destinations', created.id], {replaceUrl: true}),
                error: err => alert('Failed to add destination: ' + (err?.message ?? 'Unknown error'))
            });
        } catch (e: any) {
            this.uploading = false;
            alert('Image upload failed: ' + (e?.message ?? 'Unknown error'));
        }
    }

    clearFile(input: HTMLInputElement) {
        if (this.previewUrl) { URL.revokeObjectURL(this.previewUrl); }
        this.previewUrl = null;
        this.selectedFile = null;
        this.fileError = null;
        input.value = '';
    }
}
