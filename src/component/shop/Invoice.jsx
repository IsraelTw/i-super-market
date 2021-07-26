import React from 'react';

export default function Invoice(props) {
  function downloadTxtFile() {
    const newArr = props.items.map(i => {
      return (
        `שם: ${i.item.name} מחיר: ${i.item.price} כמות: ${i.amount} סה"כ: ${i.generalPrice}

`
      )
    })
    newArr.push(`מחיר סופי: ${props.total} ₪`);

    const element = document.createElement("a");
    const file = new Blob([newArr], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "myFile.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }
  downloadTxtFile();
  return (
    <div>
       
    </div>
  )
}