import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { HttpClient } from '@angular/common/http';
import Product from '../../models/product';

describe('ProductService', () => {
  let service: ProductService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // Импортируем модуль тестирования HttpClient для настройки HttpClient
      imports: [HttpClientTestingModule],
      // Предоставляем сервис ProductService в качестве зависимости
      providers: [ProductService],
    });
    // Получаем экземпляр сервиса
    service = TestBed.inject(ProductService);
    // Получаем экземпляр HttpClient
    httpClient = TestBed.inject(HttpClient);
    // Получаем экземпляр HttpTestingController
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  // После каждого теста проверяем, что нет оставшихся запросов к серверу
  afterEach(() => {
    httpTestingController.verify();
  });

  it('Проверяем что сервис успешно создается', () => {
    expect(service).toBeTruthy();
  });

  it('Проверяем что метод getProducts возвращает массив товаров', () => {
    // Создаем фиктивный массив товаров
    const mockProducts: Product[] = [{ id: 1, name: 'Test', price: 10 }];

    // Отправляем фиктивный запрос на сервер
    service.getProducts().subscribe((products) => {
      // Проверяем, что возвращенный массив товаров соответствует фиктивному массиву
      expect(products).toEqual(mockProducts);
    });

    // Ожидаем запрос к заданному URL
    const req = httpTestingController.expectOne('assets/data.json');
    // Проверяем, что запрос был отправлен методом GET
    expect(req.request.method).toEqual('GET');

    // Возвращаем фиктивные данные в ответ на запрос
    req.flush(mockProducts);
  });

  it('Проверяем что метод getProducts обрабатывает ошибки', () => {
    // Задаем сообщение об ошибке
    const errorMessage = 'Http failure response for assets/data.json: 0 ';

    // Отправляем фиктивный запрос на сервер
    service.getProducts().subscribe(
      // Если запрос выполнен успешно, тест считается неудачным
      () => fail('expected to fail'),
      (error) => {
        // Проверяем что возвращенная ошибка соответствует ожидаемой ошибке
        expect(error.message).toEqual(errorMessage);
      },
    );

    // Ожидаем запрос к заданному URL
    const req = httpTestingController.expectOne('assets/data.json');
    // Имитируем ошибку при выполнении запроса
    req.error(new ErrorEvent('Error', { message: errorMessage }));
  });
});
