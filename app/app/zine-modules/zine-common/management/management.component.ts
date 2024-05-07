import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ComponentFactoryResolver,
} from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { WeftHttpService } from "src/app/core/services/weft-http.service";
import { WeftAPIConfig } from "src/app/shared/weft-api-config";
import { Module, IGetRowsParams } from "ag-grid-community";
import { SearchRequestService } from "src/app/shared/services/search-request.service";
import { Console } from "console";

@Component({
  selector: "app-management",
  templateUrl: "./management.component.html",
  styleUrls: ["./management.component.scss"],
})
export class ManagementComponent implements OnInit {
  @ViewChild("filePicker", { static: false }) filePicker;

  @Input() title: string;
  @Input() hideUpload: boolean = true;
  @Input() createNavPath: string;
  @Input() getGridDataApi: string;

  @Input() gridKey: string;
  @Input() columnDefs: [];
  @Input() editNavPath: string;
  @Input() keyField: string;
  @Input() rowStyles: any;

  @Input() disableCopyTo: boolean;
  @Input() copyToApi: string;

  @Input() copyToNavPath: string;
  @Input() objType: string;
  @Input() defaultSearchParam: any;

  @Input() hideCreate: boolean;
  @Input() hideDropdown: boolean = true;
  @Input() defaultFilterParam: any;

  public managementForm: FormGroup;

  private gridApi;
  private gridColumnApi;
  public gridOptions: any;
  public modules: Module[] = [];

  public contextMenus = [];
  public rowData = [];
  public searchRequest: any;

  submitted: boolean = false;
  public bpCode: any;
  public businessPartnerCode:any;
  public getBPDataApi = "";  

  constructor(
    private fb: FormBuilder,
    private httpService: WeftHttpService,
    private router: Router,
    private searchRequestService: SearchRequestService
  ) {
    this.bpCode = localStorage.getItem("bpCode");
  }

  ngOnInit() {
    this.createForm();

    this.gridOptions = {
      rowSelection: "single",
      rowDeselection: "true",
      rowData: this.rowData,

      rowModelType: "serverSide",
      infiniteInitialRowCount: 25,
      maxConcurrentDatasourceRequests: 1,
      rowBuffer: 0,

      cacheBlockSize: 25,
      // cacheOverflowSize: 50,
      // maxBlocksInCache: 2,

      pagination: false,
      paginationPageSize: 15,
      paginationAutoPageSize: false,

      defaultColDef: {
        width: 150,
        editable: false,
        filter: true,
        floatingFilter: false,
        resizable: true,
        sortable: true,
      },
      columnDefs: this.columnDefs,
      getRowStyle: this.rowStyles,
      getContextMenuItems: (params) =>
        this.getContextMenuItems(params, this.disableCopyTo),
    };
  }

  getContextMenuItems(params, disableCopyTo) {
    var contextMenus = [
      {
        name: "Copy To",
        disabled: (params.node.data.docStatus == "C" || params.node.data.docStatus == "R") ? true : disableCopyTo,
        action: () => this.copyTo(params),
        cssClasses: ["redFont", "bold"],
      },
      "separator",
      "excelExport",
    ];

    return contextMenus;
  }
  createForm() {
    this.managementForm = this.fb.group({
      bpCode: new FormControl(),
    });
  }
  onCreateClick() {
    this.router.navigate([`${this.createNavPath}`]);
  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    var datasource = this.serverSideDatasource(this.httpService);
    params.api.setServerSideDatasource(datasource);
    this.gridApi.sizeColumnsToFit();
    this.gridApi.sizeColumnsToFit();
  }

  serverSideDatasource(httpService: WeftHttpService) {
    return {
      rowCount: null,
      getRows: (params) => {
        this.searchRequest = this.searchRequestService.generateSearchRequest(
          params,
          this.keyField,
          this.gridKey,this.defaultSearchParam
        );

        httpService
          .post(this.getGridDataApi, this.searchRequest)
          .subscribe((searchResponse) => {
            if (searchResponse["items"]) {
              var lastRow = -1;
              if (searchResponse["totalCount"] <= params.request.endRow) {
                lastRow = searchResponse["totalCount"];
              }
              params.successCallback(searchResponse["items"], lastRow);
            } else {
              params.failCallback();
            }
          });
      },
    };
  }

  onRowClicked(event: any) {
    this.router.navigate([`${this.editNavPath}/${event.data[this.keyField]}`]);
  }

  copyTo(params) {
    this.router.navigate([
      `${this.copyToNavPath}/${params.node.data[this.keyField]}/${
        this.objType
      }`,
    ]);
  }
}
