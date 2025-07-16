import {ChangeDetectionStrategy, Component, ElementRef, ViewChild} from '@angular/core';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import {InputText} from 'primeng/inputtext';
import {FormsModule} from '@angular/forms';
import {AutoFocus} from 'primeng/autofocus';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-file-create-dialog',
  imports: [
    InputText,
    FormsModule,
    AutoFocus,
    Button
  ],
  providers: [DialogService],
  templateUrl: './file-create-dialog.component.html',
  styleUrl: './file-create-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileCreateDialogComponent {
  @ViewChild('textInput') textInput: ElementRef<HTMLInputElement> | undefined;
  name: string = 'New Directory';

  constructor(private dialogService: DialogService, private ref: DynamicDialogRef) {}

  ngOnInit() {
    setTimeout(() => {
      if (this.textInput) this.textInput.nativeElement.select();
    },100)
  }

  closeDialog() {
    this.ref.close(this.name);
  }
}
