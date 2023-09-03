import 'package:dart_application_1/dart_application_1.dart';

class Animal {
  final int? _age;
  int? tall;
  Animal(this._age, this.tall);
}

void main(List<String> arguments) {
  Animal cat = Animal(12, 152);
  print(cat.tall);
  print(cat._age);
}
