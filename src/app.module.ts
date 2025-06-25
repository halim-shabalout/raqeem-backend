import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { OrganizationsModule } from './modules/organizations/organizations.module';
import { OrganizationLogosModule } from './modules/organization-logos/organization-logos.module';
import { RolesModule } from './modules/roles/roles.module';
import { PermissionsModule } from './modules/permissions/permissions.module';
import { RolePermissionsModule } from './modules/role-permissions/role-permissions.module';
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { ProductImagesModule } from './modules/product-images/product-images.module';
import { ProductSubcategoriesModule } from './modules/product-subcategories/product-subcategories.module';
import { ProductCategoriesModule } from './modules/product-categories/product-categories.module';
import { ClientsModule } from './modules/clients/clients.module';
import { QuotationsModule } from './modules/quotations/quotations.module';
import { QuotationItemsModule } from './modules/quotation-items/quotation-items.module';
import { PlansModule } from './modules/plans/plans.module';
import { PlanFeaturesModule } from './modules/plan-features/plan-features.module';
import { OrganizationPlansModule } from './modules/organization-plans/organization-plans.module';
import { SettingsModule } from './modules/settings/settings.module';
import { MethodsModule } from './modules/methods/methods.module';
import { ResourcesModule } from './modules/resources/resources.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    }),
    OrganizationsModule,
    OrganizationLogosModule,
    RolesModule,
    PermissionsModule,
    RolePermissionsModule,
    UsersModule,
    ProductCategoriesModule,
    ProductSubcategoriesModule,
    ProductsModule,
    ProductImagesModule,
    ClientsModule,
    QuotationsModule,
    QuotationItemsModule,
    PlansModule,
    PlanFeaturesModule,
    OrganizationPlansModule,
    SettingsModule,
    MethodsModule,
    ResourcesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
