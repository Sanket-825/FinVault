export function getSavingsRate(income, expense){
 if(income<=0) return 0;

 return (
  ((income-expense)/income)*100
 ).toFixed(1);
}

export function getTotalCategorySpend(categorySpend){
 return categorySpend.reduce(
  (s,c)=>s+c.amt,0
 );
}

export function getAvgIncome(monthlyData){
 if(monthlyData.length===0) return 0;

 return monthlyData.reduce(
  (s,m)=>s+m.income,0
 )/monthlyData.length;
}

export function getAvgExpense(monthlyData){
 if(monthlyData.length===0) return 0;

 return monthlyData.reduce(
  (s,m)=>s+m.expense,0
 )/monthlyData.length;
}

export function getTop3Percentage(
 categorySpend,
 total
){
 if(categorySpend.length<3 || total===0)
 return 0;

 return (
  categorySpend
   .slice(0,3)
   .reduce((s,c)=>s+c.amt,0)
  /total
 )*100;
}

export function getRentPercentage(
 categorySpend,
 total
){
 const rent =
  categorySpend.find(
   c=>c.cat==="Rent"
  );

 if(!rent || total===0)
 return "N/A";

 return (
  (rent.amt/total)*100
 ).toFixed(0);
}

export function getExpenseTrend(monthlyData){

 if(monthlyData.length<2)
 return "Add more data for trend analysis";

 const last =
 monthlyData[monthlyData.length-1];

 const prev =
 monthlyData[monthlyData.length-2];

 if(last.expense>prev.expense)
 return "Spending increased this month — watch discretionary categories";

 return "Great! Spending decreased vs last month";
}