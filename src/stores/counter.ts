import type { ICalculate } from "@/types/calculator.type";
import { defineStore } from "pinia";

export const useCalculate = defineStore("calculate", {
  state: () => {
    return {
      current: "",
      previous: null,
      operator: null,
      operatorClicked: false,
    } as ICalculate;
  },
  actions: {
    clear() {
      this.current = "";
    },
    sign() {
      this.current =
        this.current.charAt(0) === "-"
          ? this.current.slice(1)
          : `-${this.current}`;
    },
    percent() {
      this.current = `${
        this.current ? parseFloat(this.current) / 100 : this.current
      }`;
    },
    setPrevious() {
      this.previous = this.current;
      this.operatorClicked = true;
    },
    divide() {
      this.operator = (numb1, numb2) =>
        (Number(numb1) / Number(numb2)).toString();
      this.setPrevious();
    },
    append(calculus: string) {
      if (this.operatorClicked) {
        this.current = "";
        this.operatorClicked = false;
      }
      this.current = `${this.current}${calculus}`;
    },
    times() {
      this.operator = (numb1, numb2) =>
        (Number(numb1) * Number(numb2)).toString();
      this.setPrevious();
    },
    minus() {
      this.operator = (numb1, numb2) => {
        return (Number(numb2) - Number(numb1)).toString();
      };
      this.setPrevious();
    },
    add() {
      this.operator = (numb1, numb2) =>
        (Number(numb1) + Number(numb2)).toString();
      this.setPrevious();
    },
    dot() {
      if (this.current.indexOf(".") === -1) {
        this.append(".");
      }
    },
    equal() {
      console.log((Number(this.current) - Number(this.previous)).toString());
      this.current = `${
        this.operator && this.previous
          ? this.operator(this.current, this.previous)
          : "0"
      }`;
      this.previous = null;
    },
    keyDownHandler(e: KeyboardEvent) {
      if (e.key.match(/^\s*-?[0-9]{1,10}\s*$/)) {
        this.append(e.key);
      } else if (["+", "-", "*", "/"].includes(e.key)) {
        if (e.key === "+") this.add();
        if (e.key === "-") {
          if (this.current.length > 0) {
            this.minus();
          } else {
            this.sign();
          }
        }
        if (e.key === "*") this.times();
        if (e.key === "/") this.divide();
      }
      if (e.key === "Backspace") {
        if (this.current.length > 0) {
          const currentToArray = this.current.split("");
          currentToArray.pop();
          this.current = currentToArray.join("");
        } else {
          this.current = "0";
        }
      }
      if (e.key === "Enter") this.equal();
    },
  },
  getters: {
    result(): string {
      return this.current;
    },
  },
});
