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
    this.onDragChange = this.onDragChange.bind(this);
    this.onDragStart = this.onDragStart.bind(this);
  }

  onFocusedRowChanged(e): void {
    const rowData = e.row && e.row.data;

    if (rowData) {
      this.setFocusedRow(e.row.rowIndex);
      this.detectChanges();
    }
    // if (!this.rowClicked && e.row?.node && e.row?.data && !e.row.data.isNewItem) {
    // 	this.selectedChecklistNode = null;
    // 	this.selectedChecklistItem = null;
    // 	this.setFocusedRow(null);
    // 	this.selectedChecklistNode = e.row.node;
    // 	this.selectedChecklistItem = this.getRealItem(e.row.data);

    // }

    // this.rowClicked = false;
  }

  onRowClicked(e): void {
    if (e.node.data.isNewItem) {
      this.detectChanges();
      return;
    }
    this.detectChanges();
  }

  onCellPrepared(e): void {
    if (e.rowType === 'data') {
      if (e.row.node.hasChildren) {
        e.cellElement.style.color = 'var(--fg-color-primary-dark)';
      }
    }
  }

  onRowPrepared(e: any) {
    if (e.rowType === 'data' && e.data.isNewItem) {
      e.rowElement.classList.add('checklist-new-item-row');
    }
  }

  onGridResized(event: ResizedEvent): void {
    if (this.treeList != null) {
      this.treeList.instance.updateDimensions();
    }
  }

  async onTreeListKeyDown(e): Promise<void> {
    // this.rowClicked = false;
    await this.onKeyDownClicked(e.event);
  }
  private onKeyDownClicked(event: KeyboardEvent): void {
    this.detectChanges();
  }

  onNodesInitialized(e): void {
    e.component.forEachNode([e.root], (node) => {
      if (node.key === null) {
        // root
        node.children.push({
          key: '123456789_new_item',
          parentId: null,
          isNewItem: true,
          data: {
            isNewItem: true,
          },
          visible: true,
        });
      }
    });
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

    this.setFocusedRow(null);

    await delay(2000);

    this.treeList.instance.refresh().then(() => {
      this.treeList.instance.navigateToRow(toIndex).then(() => {
        this.setFocusedRow(toIndex);
        this.detectChanges();
      });
    });
  }

  setFocusedRow(id: number): void {
    this.focusedRowKey = id;
  }

  getCompletionText(cellInfo) {
    return `${cellInfo.valueText}%`;
  }

  async onDragChange(e) {
    // if (e.itemData.isNewItem) {
    //   e.cancel = true;
    //   return;
    // }
    const visibleRows = e.component.getVisibleRows();
    const sourceNode = e.component.getNodeByKey(e.itemData.id);
    let targetNode = visibleRows[e.toIndex].node;
    if (targetNode.isNewItem) {
      e.cancel = true;
      return;
    }

    await delay(3000);

    setTimeout(() => {}, 2000);
    // while (targetNode) {
    //   if (targetNode?.data.id === sourceNode?.data.id) {
    //     e.cancel = true;
    //     break;
    //   }
    //   targetNode = targetNode.parent;
    // }
  }

  onDragStart(e) {
    if (e.itemData.isNewItem) {
      e.cancel = true;
      return;
    }
  }

  public detectChanges(): void {
    this.cdr.detectChanges();
    this.cdr.markForCheck();
  }
}
