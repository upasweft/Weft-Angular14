import { Injectable } from '@angular/core';

// Define a type for the keys of WeftAPIConfig
type WeftAPIConfigKey = keyof typeof WeftAPIConfig;

export const WeftAPIConfig = {
  securityFunctionService: '/adminservice/securityfunction',
  userService: '/adminservice/erp/users',
  categoryService: '/adminservice/erp/category',
  subcategoryService: '/adminservice/erp/subcategory',
  productService: '/adminservice/erp/product',
  groupAccessService: '/adminservice/erp/groupaccess',
  menuListService: '/adminservice/erp/menuList',
  invoiceService: '/adminservice/erp/invoice',
  siteSettings: '/adminservice/erp/siteSettings',
  stockAdjustment: '/adminservice/erp/stockadjustment',
  backgroundImage: '/adminservice/erp/backgroundImage',
  bannerSettingsService: '/adminservice/erp/bannerSettings',
  contactUsService: '/adminservice/erp/contactUs',
  aboutUsService: '/adminservice/erp/aboutUs',
  privacyPolicyService: '/adminservice/erp/privacyPolicy',
  termsAndConditionsService: '/adminservice/erp/termsAndCondition',
  userGuidanceService: '/adminservice/erp/userGuidance',
  qrCodeService: '/adminservice/erp/qrCode',
  imageUploadService: '/adminservice/erp/imageUpload',
  dashboardService: '/adminservice/erp/dashboard',
  cartService: '/adminservice/erp/cartitems',
  videoUpload: '/adminservice/erp/videoupload',
  faceImageUpload: '/adminservice/erp/faceImageUpload'
};

