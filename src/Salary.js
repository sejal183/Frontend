import { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import './Salary.css'
import "jspdf-autotable";
import jsPDF from "jspdf";

function Salary() {
  let navigate = useNavigate();
  const location = useLocation();

  const [salaries, setSalaries] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/v1/salary', {
      method: 'POST',
      body: JSON.stringify({
        employee_id: location.state?.e_id
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setSalaries(data);
      })
      .catch((err) => {
        alert("Salary data not found for user with id " + location.state?.e_id + "!");
      });
  }, [location]);

  let printpdf = (event, id) => {
    event.preventDefault();
    const styles = {
      fontFamily: "sans-serif",
      textAlign: "center"
    };
    const colstyle = {
      width: "30%"
    };
    const tableStyle = {
      width: "100%"
    };
    const columns = [
      "Id",
      "PaymentDate",
      "Amount",
      "Description"
    ];
    const rows = salaries.filter(s => s.id === id).map((s) => {
      return [s.id,s.pdate,s.amount,s.description];
    });
    const pdf = new jsPDF("p", "pt", "a4");
    pdf.text(235, 40, "Salary Reciept");
    pdf.autoTable(columns, rows, {
      startY: 65,
      theme: "grid",
      styles: {
        font: "times",
        halign: "center",
        cellPadding: 3.5,
        lineWidth: 0.5,
        lineColor: [0, 0, 0],
        textColor: [0, 0, 0]
      },
      headStyles: {
        textColor: [0, 0, 0],
        fontStyle: "normal",
        lineWidth: 0.5,
        lineColor: [0, 0, 0],
        fillColor: [166, 204, 247]
      },
      alternateRowStyles: {
        fillColor: [212, 212, 212],
        textColor: [0, 0, 0],
        lineWidth: 0.5,
        lineColor: [0, 0, 0]
      },
      rowStyles: {
        lineWidth: 0.5,
        lineColor: [0, 0, 0]
      },
      tableLineColor: [0, 0, 0]
    });
    // console.log(pdf.output("datauristring"));
    pdf.save("pdf");
  }

  return (
    <div className="salary-container">
      <header>
        <button className="signout-btn" onClick={(e) => { navigate("/"); }}>Sign Out</button>
      </header>
      <h1>Salary List</h1>
      <section>
        {salaries.map((s) => {
          return (
            <article key={s.id}>
              <div className="description-wrapper">
                <span className="sal-desc">{s.description}</span>
                <span className="sal-id">{"(Salary ID : " + s.id + ")"}</span>
              </div>
              <span>{"Payment date : "}<span className="sal-pdate">{s.pdate}</span></span>
              <span>{"Amount : ₹ "}<span className="sal-amount">{s.amount}</span></span>
              <button onClick={(e) => printpdf(e, s.id)}>Download PDF</button>
            </article>
          )
        })}
      </section>
    </div>
  );
}
export default Salary;