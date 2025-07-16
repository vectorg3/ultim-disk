import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {Button} from "primeng/button";
import {Menu} from 'primeng/menu';
import {MenuItem} from 'primeng/api';
import {FileCreateModelService, FileCreateType} from '@features/file-create';
import {DialogService} from 'primeng/dynamicdialog';

@Component({
  selector: 'app-file-create-btn',
  imports: [
    Button,
    Menu
  ],
  providers: [FileCreateModelService, DialogService],
  templateUrl: './file-create-btn.component.html',
  styleUrl: './file-create-btn.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileCreateBtnComponent {
  private fileCreateModel = inject(FileCreateModelService);

  menuItems: MenuItem[] = [
    {
      label: 'Create',
      items: [
        {
          label: 'Directory',
          icon: 'pi pi-folder',
          command: () => this.fileCreateModel.showDialog(FileCreateType.directory)
        },
        {
          label: 'File',
          icon: 'pi pi-file',
          command: () => this.fileCreateModel.showDialog(FileCreateType.file)
        }
      ]
    }
  ]


}
