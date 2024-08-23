import { Component, OnInit } from '@angular/core';
import { WeftHttpService } from 'src/app/core/services/weft-http.service';
import { WeftAPIConfig } from 'src/app/shared/weft-api-config';
import { Router } from '@angular/router';

@Component({
  selector: 'weft-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  // Existing properties
  public loggedInUser: any;
  groupServiceApi: string = WeftAPIConfig.groupAccessService + "/access/";
  groupId!: number;
  groupResult: any;
  userData: any = [];
  userFlag!: boolean;
  settingsFlag!: boolean;
  adminuserFlag!: boolean;
  invoiceFlag!: boolean;
  categoryFlag!: boolean;
  subcategoryFlag!: boolean;
  productFlag!: boolean;
  stockFlag!: boolean;
  stockReportFlag!: boolean;
  userReportFlag!: boolean;
  productReportFlag!: boolean;
  salesReportFlag!: boolean;
  vatReportFlag!: boolean;
  dailySalesReportFlag!: boolean;
  backgroundImageDataFlag!: boolean;
  voidDataFlag!: boolean;
  monthlyDataFlag!: boolean;
  qrCodeFlag!: boolean;
  qrCodeMergeFlag!: boolean;
  imageEditFlag!: boolean;
  viewImageFlag!: boolean;
  siteSettingsFlag!: boolean;
  userSettingFlag!: boolean;
  editingFlag!: boolean;
  cmsFlag!: boolean;
  productSettingFlag!: boolean;
  setupDataFlag!: boolean;
  bannerSettingsDataFlag!: boolean;
  aboutusDataFlag!: boolean;
  contactusDataFlag!: boolean;
  privacypolicyDataFlag!: boolean;
  termsandconditionsDataFlag!: boolean;
  userguidanceDataFlag!: boolean;

  // New properties
  reportSettingsFlag!: boolean;
  usedQrCodeReportFlag!: boolean;
  adminuserData: any;

  constructor(private httpService: WeftHttpService, private router: Router) {}

  ngOnInit() {
    const userLoggedIn = localStorage.getItem('userLoggedIn');
    if (userLoggedIn) {
      this.loggedInUser = JSON.parse(userLoggedIn);
      this.checkUserType();
    }
  }

  checkUserType() {
    switch (this.loggedInUser?.info.UserType) {
      case 'D':
        this.groupId = 1;
        break;
      case 'A':
        this.groupId = 2;
        break;
      case 'S':
        this.groupId = 3;
        break;
      default:
        return;
    }
    this.getGroupService();
  }

  getGroupService() {
    this.httpService.get(this.groupServiceApi + this.groupId).subscribe(result => {
      if (result) {
        this.groupResult = result;
        this.userData = this.groupResult.filter((s: { groupId: number; subMenuId: number; }) => s.groupId == this.groupId && s.subMenuId == 2);
        this.userFlag = this.userData.length > 0;

        this.adminuserData = this.groupResult.filter((s: { groupId: number; subMenuId: number; }) => s.groupId == this.groupId && s.subMenuId == 1);
        this.adminuserFlag = this.adminuserData.length > 0;

        this.settingsFlag = this.groupResult.some((s: { groupId: number; subMenuId: number; }) => s.groupId == this.groupId && s.subMenuId == 3);
        this.invoiceFlag = this.groupResult.some((s: { groupId: number; subMenuId: number; }) => s.groupId == this.groupId && s.subMenuId == 4);
        this.categoryFlag = this.groupResult.some((s: { groupId: number; subMenuId: number; }) => s.groupId == this.groupId && s.subMenuId == 5);
        this.subcategoryFlag = this.groupResult.some((s: { groupId: number; subMenuId: number; }) => s.groupId == this.groupId && s.subMenuId == 6);
        this.productFlag = this.groupResult.some((s: { groupId: number; subMenuId: number; }) => s.groupId == this.groupId && s.subMenuId == 7);
        this.stockFlag = this.groupResult.some((s: { groupId: number; subMenuId: number; }) => s.groupId == this.groupId && s.subMenuId == 14);
        this.stockReportFlag = this.groupResult.some((s: { groupId: number; subMenuId: number; }) => s.groupId == this.groupId && s.subMenuId == 15);
        this.userReportFlag = this.groupResult.some((s: { groupId: number; subMenuId: number; }) => s.groupId == this.groupId && s.subMenuId == 8);
        this.productReportFlag = this.groupResult.some((s: { groupId: number; subMenuId: number; }) => s.groupId == this.groupId && s.subMenuId == 9);
        this.salesReportFlag = this.groupResult.some((s: { groupId: number; subMenuId: number; }) => s.groupId == this.groupId && s.subMenuId == 10);
        this.vatReportFlag = this.groupResult.some((s: { groupId: number; subMenuId: number; }) => s.groupId == this.groupId && s.subMenuId == 12);
        this.dailySalesReportFlag = this.groupResult.some((s: { groupId: number; subMenuId: number; }) => s.groupId == this.groupId && s.subMenuId == 13);
        this.backgroundImageDataFlag = this.groupResult.some((s: { groupId: number; subMenuId: number; }) => s.groupId == this.groupId && s.subMenuId == 16);
        this.voidDataFlag = this.groupResult.some((s: { groupId: number; subMenuId: number; }) => s.groupId == this.groupId && s.subMenuId == 18);
        this.monthlyDataFlag = this.groupResult.some((s: { groupId: number; subMenuId: number; }) => s.groupId == this.groupId && s.subMenuId == 25);
        this.qrCodeFlag = this.groupResult.some((s: { groupId: number; subMenuId: number; }) => s.groupId == this.groupId && s.subMenuId == 24);
        this.qrCodeMergeFlag = this.groupResult.some((s: { groupId: number; subMenuId: number; }) => s.groupId == this.groupId && s.subMenuId == 28);
        this.imageEditFlag = this.groupResult.some((s: { groupId: number; subMenuId: number; }) => s.groupId == this.groupId && s.subMenuId == 26);
        this.viewImageFlag = this.groupResult.some((s: { groupId: number; subMenuId: number; }) => s.groupId == this.groupId && s.subMenuId == 27);
        this.siteSettingsFlag = this.groupResult.some((s: { groupId: number; subMenuId: number; }) => s.groupId == this.groupId && s.subMenuId == 11);
        this.userSettingFlag = this.groupResult.some((s: { groupId: number; menuId: number; }) => s.groupId == this.groupId && s.menuId == 1);
        this.editingFlag = this.groupResult.some((s: { groupId: number; menuId: number; }) => s.groupId == this.groupId && s.menuId == 6);
        this.cmsFlag = this.groupResult.some((s: { groupId: number; menuId: number; }) => s.groupId == this.groupId && s.menuId == 7);
        this.productSettingFlag = this.groupResult.some((s: { groupId: number; menuId: number; }) => s.groupId == this.groupId && s.menuId == 4);
        this.setupDataFlag = this.groupResult.some((s: { groupId: number; menuId: number; }) => s.groupId == this.groupId && s.menuId == 2);
        this.bannerSettingsDataFlag = this.groupResult.some((s: { groupId: number; subMenuId: number; }) => s.groupId == this.groupId && s.subMenuId == 17);
        this.aboutusDataFlag = this.groupResult.some((s: { groupId: number; subMenuId: number; }) => s.groupId == this.groupId && s.subMenuId == 19);
        this.contactusDataFlag = this.groupResult.some((s: { groupId: number; subMenuId: number; }) => s.groupId == this.groupId && s.subMenuId == 20);
        this.privacypolicyDataFlag = this.groupResult.some((s: { groupId: number; subMenuId: number; }) => s.groupId == this.groupId && s.subMenuId == 22);
        this.termsandconditionsDataFlag = this.groupResult.some((s: { groupId: number; subMenuId: number; }) => s.groupId == this.groupId && s.subMenuId == 23);
        this.userguidanceDataFlag = this.groupResult.some((s: { groupId: number; subMenuId: number; }) => s.groupId == this.groupId && s.subMenuId == 21);
      }
    });
  }
}