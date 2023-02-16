export interface ICalculate {
  current: string;
  previous: null | string;
  operator: null | ((numb1: string, numb2: string) => string);
  operatorClicked: boolean;
}
