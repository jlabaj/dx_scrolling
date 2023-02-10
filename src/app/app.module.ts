import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SortablejsModule } from 'ngx-sortablejs';
import devextremeAjax from 'devextreme/core/utils/ajax';
import { sendRequestFactory } from './dx-http-client-helper';
import {
  DevExtremeModule,
  DxButtonGroupModule,
  DxButtonModule,
  DxCalendarModule,
  DxChartModule,
  DxCheckBoxModule,
  DxColorBoxModule,
  DxContextMenuModule,
  DxDataGridModule,
  DxDateBoxModule,
  // DxVectorMapModule,
  DxDraggableModule,
  // DxDiagramModule,
  DxDropDownBoxModule,
  DxDropDownButtonModule,
  DxFileUploaderModule,
  DxFilterBuilderModule,
  DxFormModule,
  DxHtmlEditorModule,
  DxListModule,
  DxLoadIndicatorModule,
  DxLoadPanelModule,
  DxLookupModule,
  DxMenuModule,
  DxNumberBoxModule,
  // DxPieChartModule,
  DxPivotGridModule,
  DxPopoverModule,
  DxPopupModule,
  DxRadioGroupModule,
  DxRangeSelectorModule,
  DxSchedulerModule,
  DxScrollViewModule,
  DxSelectBoxModule,
  DxSliderModule,
  DxSortableModule,
  DxSpeedDialActionModule,
  DxSwitchModule,
  DxTabPanelModule,
  DxTabsModule,
  DxTagBoxModule,
  DxTemplateHost,
  DxTextAreaModule,
  DxTextBoxModule,
  DxTileViewModule,
  DxToastModule,
  DxToolbarModule,
  DxTooltipModule,
  DxTreeListModule,
  DxTreeViewModule,
  DxValidatorModule,
} from 'devextreme-angular';
import { Service } from './app.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DxPopoverModule,
    SortablejsModule.forRoot({ animation: 250, swapThreshold: 0.65 }),
    DxTreeListModule,
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [Service],
})
export class AppModule {
  constructor(httpClient: HttpClient) {
    devextremeAjax.inject({ sendRequest: sendRequestFactory(httpClient) });
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
