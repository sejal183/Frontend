function Salary(){
    fetch('http://localhost:8080/api/v1/salary', {
      method: 'POST',
      body: JSON.stringify({
        employee_id:1
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
    return (<div></div>);
}
export default Salary;