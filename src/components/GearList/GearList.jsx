import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import * as React from 'react';
import './GearList.css';


function GearList({ tripid }) {
  const gears = useSelector((store) => store.gear);
  const dispatch = useDispatch();
  const { id } = useParams();

  // const fetchGear = (id) => {
  //   axios.get(`/api/gearlist/${id}`)
  //     .then((response) => {
  //       console.log('Fetched gear data',response.data);
  //       setGearArray(response.data);
  //     })
  //     .catch((error) => {
  //       console.log('error fetching list', error);
  //     });
  // }
  // useEffect(() => fetchGear(id), [id, gearUpdate]); 

  // Redux Saga Fetch
  useEffect(() => {
    dispatch({ type: 'FETCH_GEAR', payload: id });
  }, []);

  // Redux Saga Update
  const toggleBuy = (tripid, gearId) => {
    console.log('Toggling buy/bought status for gear:', tripid, gearId);

    dispatch({
      type: 'UPDATE_GEAR',
      payload: {
        tripid: tripid,
        gearId: gearId
      }
    });
  };

  // Redux Saga Remove
  const deleteGear = (tripid, gearId) => {
    console.log('Deleting piece of gear from list:', tripid, gearId);

    dispatch({
      type: 'DELETE_GEAR',
      payload: {
        tripid: tripid,
        gearId: gearId
      }
    });
  };

  function stringToColor(string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }
  
  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }

  // let name = `${gears.first_name} ${gears.last_name}`
  // const toggleBuy = (gearid) => {
  //   console.log('toggling buy/bought status', gearid);

  //   axios({
  //     method: 'PUT',
  //     url: `/api/gearlist/buy/${gearid}`
  //   })
  //     .then((response) => {
  //       console.log('buy toggle successful', response);
  //       fetchGear(id);
  //     })
  //     .catch(function (error) {
  //       console.log(error)
  //     })
  // }

  //  const deleteItem = (deleteid) => {
  //     axios({
  //       method: 'DELETE',
  //       url: `/api/gearlist/${deleteid}`
  //     })
  //       .then((response) => {
  //         console.log('delete item worked', response)
  //         fetchGear(id);
  //       })
  //       .catch(function (error) {
  //         console.log(error)
  //       })
  //   }

  return (
    <div className="container">
 <TableContainer component={Paper}>
      <Table sx={{ minWidth: 50 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Paddler</TableCell>
            <TableCell align="left">Item</TableCell>
            <TableCell align="right">Qty</TableCell>
            <TableCell align="right">Buy</TableCell>
            <TableCell align="right">Remove</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {gears.map((gear) => (
            <TableRow
              key={gear.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
               <TableCell component="th" scope="row">
              <Avatar sx={{ width: 20, height: 20 }} {...stringAvatar(`${gear.first_name} ${gear.last_name}`)} />
              </TableCell>
              <TableCell  align="left">
                {gear.item}
              </TableCell>
              <TableCell align="right">{gear.quantity}</TableCell>
             
              <TableCell>
              <input
                    type="checkbox"
                    className="buyCheckbox"
                    checked={gear.buy}
                    onChange={() => toggleBuy(tripid, gear.id)}
                  />
            </TableCell>
            </TableRow>

          ))}
        </TableBody>
      </Table>
    </TableContainer>



      {/* <table>
        <tbody>
          {gears.map((gear) => {
            return (
              <tr key={gear.id}>
                <td>{gear.item}</td>
                <td>{gear.quantity}</td>
                <td>{gear.buy}</td>
                <td>{gear.first_name}</td>
                <td>
                  <input
                    type="checkbox"
                    className="buyCheckbox"
                    checked={gear.buy}
                    onChange={() => toggleBuy(tripid, gear.id)}
                  />
                </td>
                <td><button className="buyButton" onClick={() => toggleBuy(gear.id)}> Buy </button> </td>
                <td><button className="deleteButton" onClick={() => deleteGear(tripid, gear.id)}>Remove</button></td>
              </tr>);
          })
          }
        </tbody>
      </table> */}
      
    </div>

  );
}

export default GearList;