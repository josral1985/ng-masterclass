import { Component, EventEmitter, Output } from '@angular/core';
import { Product } from '../product';
import { ProductsService } from '../products.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { priceRangeValidator } from '../price-range.directive';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css'],
})
export class ProductCreateComponent {
  // productForm = new FormGroup({
  //   name: new FormControl('', { nonNullable: true }),
  //   price: new FormControl<number | undefined>(undefined, {
  //     nonNullable: true,
  //   }),
  // });

  // productForm: FormGroup<{
  //       name: FormControl<string>;
  //       price: FormControl<number | undefined>;
  //     }>
  //   | undefined;

  // productForm = new FormGroup({
  //   name: new FormControl('', {
  //     nonNullable: true,
  //     validators: Validators.required,
  //   }),
  //   price: new FormControl<number | undefined>(undefined, {
  //     nonNullable: true,
  //     validators: [Validators.required, Validators.min(1)]
  //   }),
  // });

  productForm = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    price: new FormControl<number | undefined>(undefined, {
      nonNullable: true,
      validators: [Validators.required, priceRangeValidator()]
    }),
  });

  @Output() added = new EventEmitter<Product>();

  constructor(
    private productsService: ProductsService,
    private builder: FormBuilder
  ) {}

  private buildForm() {
    this.productForm = this.builder.nonNullable.group({
      name: this.builder.nonNullable.control(''),
      price: this.builder.nonNullable.control<number | undefined>(
        undefined,
        {}
      ),
    });
  }

  get name() {
    return this.productForm!.controls.name;
  }
  get price() {
    return this.productForm!.controls.price;
  }

  createProduct() {
    this.productsService
      .addProduct(this.name.value, Number(this.price.value))
      .subscribe((product) => {
        this.productForm!.reset();
        this.added.emit(product);
      });
  }
}
