import { IsString, Length, IsMongoId, IsNumber, IsArray, ArrayUnique, IsOptional, IsISBN } from 'class-validator';
import { IBook } from 'models/book.model';
import { ICategory } from 'models/category.model';

class BookDto {
  @IsString()
  @Length(2, 25)
  title: IBook['title'];

  @IsString()
  @Length(10,)
  @IsOptional()
  synopsis?: IBook['synopsis'];

  @IsMongoId()
  @IsOptional()
  category?: ICategory['_id'];

  @IsString()
  @IsOptional()
  imageUrl?: IBook['imageUrl'];

  @IsString()
  @IsOptional()
  author?: IBook['author'];

  @IsNumber()
  @IsOptional()
  published?: IBook['published'];

  @ArrayUnique()
  @IsArray()
  @IsOptional()
  publishers?: IBook['publishers'];

  @IsISBN()
  isbn: IBook['isbn'];
}

export default BookDto;
