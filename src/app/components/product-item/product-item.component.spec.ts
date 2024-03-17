import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductItemComponent } from './product-item.component';
import { RouterTestingModule } from '@angular/router/testing';
import Item from '../../models/item';

describe('ProductItemComponent', () => {
  let component: ProductItemComponent;
  let fixture: ComponentFixture<ProductItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Объявляем компоненты, которые используются в этом модуле
      declarations: [ProductItemComponent],
      // Импортируем модуль тестирования маршрутизатора для настройки маршрутизатора
      imports: [RouterTestingModule],
    }).compileComponents();
  });

  // Начинаем блок, в котором создаем экземпляр компонента перед каждым тестом
  beforeEach(() => {
    // Создаем экземпляр компонента
    fixture = TestBed.createComponent(ProductItemComponent);
    // Получаем экземпляр компонента
    component = fixture.componentInstance;
  });

  it('Проверяем, что компонент успешно создается', () => {
    expect(component).toBeTruthy();
  });

  it('Проверяем, что событие added отправляется с правильным элементом при добавлении товара', () => {
    // Создаем фиктивный продукт
    const product = { id: 1, name: 'Test', price: 10 };
    // Мокируем вызов alert
    spyOn(window, 'alert');
    // Мокируем событие added
    const mockEmitter = spyOn(component.added, 'emit');
    // Вызываем метод добавления товара
    component.addItem(product);
    // Проверяем, что событие added было вызвано с правильным элементом
    expect(mockEmitter).toHaveBeenCalledWith(new Item(product, 1));
    // Проверяем, что был вызван alert с правильным сообщением
    expect(window.alert).toHaveBeenCalledWith(`${product.name} added.`);
  });
});
