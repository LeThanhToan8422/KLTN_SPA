import { Module } from '@nestjs/common';
import { ServiceCategoryService } from './service-category.service';
import { ServiceCategoryController } from './service-category.controller';

@Module({
  providers: [ServiceCategoryService],
  controllers: [ServiceCategoryController],
})
export class ServiceCategoryModule {}
