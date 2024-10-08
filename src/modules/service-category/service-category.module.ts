import { Module } from '@nestjs/common';
import { ServiceCategoryService } from './service-category.service';
import { ServiceCategoryController } from './service-category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import ServiceCategory from 'src/entities/service-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceCategory])],
  providers: [ServiceCategoryService],
  controllers: [ServiceCategoryController],
})
export class ServiceCategoryModule {}
