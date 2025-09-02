import axios from "axios";
import { useState } from "react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { AgGridReact } from "ag-grid-react";
import type { ColDef, ICellRendererParams } from "ag-grid-community";

type Repository = {
    id: number;
    full_name: string;
    html_url: string;
}

export default function RestGithub(){
    const [keyword, setKeyword] = useState('');
    const [repoData, setRepoData] = useState<Repository[]>([]);
    const [colDefs] = useState<ColDef[]>([
        {field: 'id', sortable: true, filter: true},
        {field: 'full_name', sortable: true, filter: true},
        {field: 'html_url', sortable: true, filter: true},
        {
            headerName: 'Actions',
            field: 'full_name',
            cellRenderer: (params: ICellRendererParams) => (
                <button onClick={() => alert(params.value)}>
                    Press me
                </button>
            )
        }
    ])

    const handleClick = async () => {
  try {
    const res = await axios.get(`https://api.github.com/search/repositories?q=${keyword}`);
    if (res.data && res.data.items) {
      setRepoData(res.data.items);
    } else {
      setRepoData([]);
    }
  } catch (error) {
    console.error("API 요청 실패:", error);
  }
};
    return(
        <>
            <div className="App">
            <input 
                value={keyword}
                onChange={e => setKeyword(e.target.value)}
            />
            <button className="bg-sky-100 rounded-lg p-2 font-bold" onClick={handleClick}>불러오기</button>
            <div className="ag-theme-material" style={{height: 500, width: 850}}>
                <AgGridReact rowData={repoData} columnDefs={colDefs} pagination={true} paginationAutoPageSize={8}/>
            </div>
            </div>
        </>
    )
}

{/* {repoData.length === 0 ? (
                <p>No Repo Data</p>
            ): (
                <table>
                    <tbody>
                        {repoData.map(repo =>(
                            <tr key={repo.id}>
                                <td>{repo.full_name}</td>
                                <td><a href={repo.html_url}>{repo.html_url}</a></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )} */}