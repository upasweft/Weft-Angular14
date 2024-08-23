import {
  Component,
  Input,
  forwardRef,
  Output,
  EventEmitter,
} from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from "@angular/forms";
import { Subject } from "rxjs";
import { SearchRequestService } from "src/app/shared/services/search-request.service";
import { WeftHttpService } from "src/app/core/services/weft-http.service";
import {
  map,
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from "rxjs/operators";

@Component({
  selector: "app-cfl",
  templateUrl: "./cfl.component.html",
  styleUrls: ["./cfl.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CflSelectComponent),
      multi: true,
    },
  ],
})
export class CflSelectComponent implements ControlValueAccessor {
  @Input() bindValue;
  @Input() bindLabel;
  @Input() getDataApi;
  @Input() bpType;
  @Input() defaultFilterParam;
  @Output() change = new EventEmitter<any>();

  propagateChange = (_: any) => {};

  public cflForm: FormGroup;
  public items = [];
  public loading = false;
  public bufferSize = 25;
  public numberOfItemsFromEndBeforeFetchingMore = 10;
  public filter: Subject<string> = new Subject<string>();
  public hasMoreData = true;

  constructor(
    private fb: FormBuilder,
    private httpService: WeftHttpService,
    private searchRequestService: SearchRequestService
  ) {
    this.cflForm = this.fb.group({
      code: new FormControl(),
    });
  }

  writeValue(value: any): void {
    this.onFilter();
    this.filter.next();
    if (value) {
      this.cflForm.controls["code"].setValue(value);
    }
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {}
  setDisabledState?(isDisabled: boolean): void {}

  getData(searchParam?: string) {
    if(!this.hasMoreData)
      return;

    this.loading = true;
    var request = this.searchRequestService.getSearchRequest(
      this.bindValue,
      null,
      this.items.length,
      this.defaultFilterParam
    );
    return this.httpService.post(this.getDataApi, request).pipe(
      map((res) => {
        if (res != null) {
          // setTimeout(() => {
            this.items = this.items.concat(res["items"]);
            this.loading = false;
            this.hasMoreData = !(this.items.length === res["totalCount"]);
          // }, 200);
        }
      })
    );
  }

  onFilter() {
    this.filter
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        switchMap((searchParam) => this.getData(searchParam))
      )
      .subscribe();
  }

  onScrollToEnd(searchParam?: string) {
    this.filter.next(searchParam);
  }

  onScroll({ end }) {
    if (this.loading) {
      return;
    }

    if (
      this.items.length <=
      end + this.numberOfItemsFromEndBeforeFetchingMore
    ) {
      this.filter.next();
    }
  }

  onChange(item) {
    this.propagateChange(this.cflForm.controls.code.value);
    this.change.next(item);
  }

  onSearch(searchParam:any){
    var searchedItem;
    searchedItem = this.items.filter(x=> {return x[this.bindValue].startsWith(searchParam.term);});
    if(searchedItem.length === 0){
      if(!this.hasMoreData)
          return searchedItem;

      this.getData().subscribe(()=>{
        searchedItem = this.items.filter(x=> {return x[this.bindValue].startsWith(searchParam.term);});
        if(searchedItem.length === 0){
          this.onSearch(searchParam);
        }
      })
    }
    return searchedItem;
  }
}
