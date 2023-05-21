const fs = require('fs');
const randomData = [];

const year = 2022;
const category = ['rent', 'vehicle', 'utensils', 'entertainment'];
const amounts = [200, 500, 600, 800, 1000, 1500, 2000];
for (let months = 1; months <= 12; months++) {
  for (let day = 1; day < 30; day++) {
    randomData.push({
      user: 'letodluhar16@gmail.com',
      category: category[Math.ceil(Math.random() * 3)],
      amount: amounts[Math.ceil(Math.random() * 6)],
      createdAt: new Date(`2022/${months}/${day}`),
    });
  }
}
