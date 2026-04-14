import { Component, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InvestmentService } from '../investment.service';


@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css'
})
export class UserInputComponent {

  enteredInitialInvestment = signal("5000");
  enteredAnnualInvestment = signal("500");
  enteredExpectedReturn = signal("5");
  enteredDuration = signal("10");

  constructor(private investmentService: InvestmentService){}

  onSumbit() {
    this.investmentService.calculateInvestmentResults({
      initialInvestment: +this.enteredAnnualInvestment(),
      duration: +this.enteredDuration(),
      expectedReturn: +this.enteredExpectedReturn(),
      annualInvestment: +this.enteredAnnualInvestment()
    });
    this.enteredInitialInvestment.set("0");
    this.enteredAnnualInvestment.set("0");
    this.enteredExpectedReturn.set("5");
    this.enteredDuration.set("10");

  }
}
