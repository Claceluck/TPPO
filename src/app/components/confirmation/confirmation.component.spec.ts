import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmationComponent } from './confirmation.component';
import { CartService } from '../../services/cart/cart.service';

describe('ConfirmationComponent', () => {
  let component: ConfirmationComponent;
  let fixture: ComponentFixture<ConfirmationComponent>;
  // Создаем фиктивный объект для CartService
  let mockCartService: jasmine.SpyObj<CartService>;

  // Начинаем блок, в котором настраиваем каждый тест
  beforeEach(async () => {
    // Создаем фиктивный объект для CartService с помощью Jasmine
    mockCartService = jasmine.createSpyObj('CartService', [
      'calcTotal',
      'getFullName',
    ]);

    // Объявляем компоненты, которые используются в этом модуле
    await TestBed.configureTestingModule({
      declarations: [ConfirmationComponent],
      // Предоставляем фиктивный объект CartService в качестве зависимости
      providers: [{ provide: CartService, useValue: mockCartService }],
    }).compileComponents();
  });

  // Начинаем блок, в котором создаем экземпляр компонента перед каждым тестом
  beforeEach(() => {
    // Создаем экземпляр компонента
    fixture = TestBed.createComponent(ConfirmationComponent);
    // Получаем экземпляр компонента
    component = fixture.componentInstance;
  });

  it('Проверяем, что компонент успешно создается', () => {
    expect(component).toBeTruthy();
  });

  it('Проверяем, что общая стоимость и полное имя устанавливаются при инициализации', () => {
    // Мокируем метод calcTotal и задаем его возвращаемое значение
    mockCartService.calcTotal.and.returnValue(100);
    // Мокируем метод getFullName и задаем его возвращаемое значение
    mockCartService.getFullName.and.returnValue('John Doe');
    // Вызываем метод инициализации компонента
    component.ngOnInit();
    // Проверяем, что общая стоимость установлена правильно
    expect(component.totalPrice).toBe(100);
    // Проверяем, что полное имя установлено правильно
    expect(component.fullName).toBe('John Doe');
    // Проверяем, что метод calcTotal был вызван у mockCartService
    expect(mockCartService.calcTotal).toHaveBeenCalled();
    // Проверяем, что метод getFullName был вызван у mockCartService
    expect(mockCartService.getFullName).toHaveBeenCalled();
  });
});
