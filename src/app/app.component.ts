import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { Employee, Priority, Service, Task } from './app.service';
import Guid from 'devextreme/core/guid';
import { DxTreeListComponent } from 'devextreme-angular';
import { ResizedEvent } from 'angular-resize-event';
import { delay } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('treelist') public treeList: DxTreeListComponent;

  tasks: Task[];

  employees: Employee[];

  priorities: Priority[];

  statuses: string[];

  public focusedRowKey: number;

  constructor(service: Service, private cdr: ChangeDetectorRef) {
    this.tasks = service.getTasks();
    this.employees = service.getEmployees();
    this.priorities = service.getPriorities();

    this.statuses = [
      'Not Started',
      'Need Assistance',
      'In Progress',
      'Deferred',
      'Completed',
    ];

    this.onReorder = this.onReorder.bind(this);
  }

  async onReorder(e) {
    const visibleRows = e.component.getVisibleRows();
    const toIndex = this.tasks.findIndex(
      (item) => item.Task_ID === visibleRows[e.toIndex].data.Task_ID
    );
    const fromIndex = this.tasks.findIndex(
      (item) => item.Task_ID === e.itemData.Task_ID
    );

    this.tasks.splice(fromIndex, 1);
    this.tasks.splice(toIndex, 0, e.itemData);
  }

  getCompletionText(cellInfo) {
    return `${cellInfo.valueText}%`;
  }
}
