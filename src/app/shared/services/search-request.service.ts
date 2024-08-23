import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class SearchRequestService {
  constructor() {}

  generateSearchRequest(
    rowsParams: { request: { filterModel: { [x: string]: any; }; startRow: number; sortModel: string | any[]; }; },
    keyField: string,
    gridKey: string,
    defaultSearchParam?: any
  ): any {
    var searchCriterias: any[] = [];
    var searchParams = [];
    var orderBy = {
      propertyName: keyField,
      direction: "Descending",
    };

    var searchRequest = {
      userId: 0,
      gridKey: gridKey,
      searchCriterias: searchCriterias,
      lastIndex: 0,
      pageSize: 25,
      orderBy: orderBy,
    };

    if (
      rowsParams.request.filterModel &&
      Object.keys(rowsParams.request.filterModel).length > 0
    ) {
      Object.keys(rowsParams.request.filterModel).forEach((key) => {
        var searchParam = {
          key: key,
          value: rowsParams.request.filterModel[key],
          operator: rowsParams.request.filterModel["type"],
          type: rowsParams.request.filterModel["filterType"],
        };
        searchParams.push(searchParam);
      });
      if (defaultSearchParam) {
        searchParams.push(defaultSearchParam);
      }
      var searchCriteria = {
        logicalOperator: "AND",
        searchParams: searchParams,
        excludeCriteria: false,
      };
      searchCriterias.push(searchCriteria);
    }
    else if (defaultSearchParam){
      searchParams.push(defaultSearchParam);
      var searchCriteria = {
        logicalOperator: "AND",
        searchParams: searchParams,
        excludeCriteria: false,
      };
      searchCriterias.push(searchCriteria);
    }

    searchRequest["userId"] = 0;
    searchRequest["gridKey"] = gridKey;
    searchRequest["searchCriterias"] = searchCriterias;
    searchRequest["lastIndex"] = rowsParams.request.startRow;
    searchRequest["pageSize"] = 25;

    if (
      rowsParams.request.sortModel &&
      rowsParams.request.sortModel.length > 0
    ) {
      orderBy = {
        propertyName: rowsParams.request.sortModel[0]["colId"],
        direction:
          rowsParams.request.sortModel[0]["sort"] === "asc"
            ? "Ascending"
            : "Descending",
      };

      searchRequest["orderBy"] = orderBy;
    }
    return searchRequest;
  }

  getSearchRequest(key: any, value: null | undefined, rowIndex: number, defaultFilterParam?: any): any {
    var searchCriterias = [];
    var searchParams = [];

    var searchParam = {
      key: key,
      value: value === undefined || value === null ? "" : value,
      operator: "Contains",
      type: "AND",
    };
    searchParams.push(searchParam);

    if (defaultFilterParam){
      searchParams.push(defaultFilterParam);
    }

    var searchCriteria = {
      logicalOperator: "AND",
      searchParams: searchParams,
      excludeCriteria: false,
    };

    searchCriterias.push(searchCriteria);

    var orderBy = {
      propertyName: key,
      direction: "Ascending",
    };

    var searchRequest = {
      userId: 0,
      gridKey: "ng-select",
      searchCriterias: searchCriterias,
      lastIndex: rowIndex,
      pageSize: 25,
      orderBy: orderBy,
    };

    return searchRequest;
  }
}
