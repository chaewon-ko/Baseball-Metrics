import React from 'react';
import styled from 'styled-components';

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    padding: 10px;
    border: 1px solid #ddd;
    text-align: left;
  }

  th {
    background-color: #f2f2f2;
    color: #333;
  }

  tr:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const Table = () => {
  const data = [
    { id: 1, name: 'John Doe', age: 25, city: 'New York' },
    { id: 2, name: 'Jane Doe', age: 30, city: 'San Francisco' },
    { id: 3, name: 'Bob Smith', age: 22, city: 'Chicago' },
  ];

  return (
    <StyledTable>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Age</th>
          <th>City</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.age}</td>
            <td>{item.city}</td>
          </tr>
        ))}
      </tbody>
    </StyledTable>
  );
};

export default Table;
