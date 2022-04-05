import { IsString, Length, IsOptional } from 'class-validator';
import { ICategory } from 'models/category.model';

class CategoryDto {
  @IsString()
  @Length(2, 25)
  name: ICategory['name'];

  @IsString()
  @Length(10, 255)
  @IsOptional()
  description: ICategory['description'];
}

export default CategoryDto;
