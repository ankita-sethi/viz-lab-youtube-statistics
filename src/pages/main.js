import React, { useState, useEffect, useRef } from 'react';
import Papa from 'papaparse';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Switch from '@mui/material/Switch';
import Box from '@mui/material/Box';
import BarChart from '../components/bar-chart';
import Button from '@mui/material/Button';
import { CUSTOM_COLUMNS } from '../constants/attributes';
import Histogram from '../components/histogram';
import '../App.css';
import ScatterPlot from '../components/scatter-plot';

const genKeys = (column, data) => {
    const monthNameToIndex = {
        'Jan': 0,
        'Feb': 1,
        'Mar': 2,
        'Apr': 3,
        'May': 4,
        'Jun': 5,
        'Jul': 6,
        'Aug': 7,
        'Sep': 8,
        'Oct': 9,
        'Nov': 10,
        'Dec': 11
      };
      const channelToIndex = {
        'Music': 0,
        'Entertainment': 1,
        'Education': 2,
        'People': 3,
        'Sports': 4,
        'Film': 5,
        'News': 6,
        'Games': 7,
        'Howto': 8,
        'Comedy': 9,
        'Nonprofit': 10,
        'Tech': 11,
        'Animals': 12,
        'Autos': 13
      }
      const countries = ['India', 'United States', 'Russia', 'South Korea', 'Canada', 'Argentina',
             'United Kingdom', 'Chile', 'Cuba', 'El Salvador', 'Brazil', 'Pakistan',
             'Philippines', 'Colombia', 'Barbados', 'Mexico', 'United Arab Emirates',
             'Spain', 'Thailand', 'Saudi Arabia', 'Indonesia', 'Turkey', 'Venezuela',
             'Kuwait', 'Jordan', 'Netherlands', 'Italy', 'Japan', 'Germany', 'France',
             'Latvia', 'Switzerland', 'Ukraine', 'Australia', 'Vietnam', 'Malaysia', 'China',
             'Singapore', 'Sweden', 'Egypt', 'Ecuador', 'Samoa']

    const countryObject = {};
    countries.forEach((country, index) => {
        countryObject[country] = index;
    });
    if(column === 'created_month') {
    return monthNameToIndex[data]

    } else if(column === 'channel_type') {
    return channelToIndex[data]
    } else if(column === 'country'){
        return countryObject[data]
    }

}
async function fetchData() {
  const csvData = await fetchCSVData();
  const parsedData = Papa.parse(csvData).data;
  const modifiedData = await parsedData.slice(1).map(row => {
    const obj = {};
    parsedData[0].forEach((col, index) => {
      obj[col] = row[index];
      if(col === 'created_month') {
        obj.month_index = genKeys(col, row[index])
      } else if(col === 'channel_type') {
        obj.channel_index = genKeys(col, row[index])
      } else if(col === 'country') {
        obj.country_index = genKeys(col, row[index])
      }
    });
    return obj;
  });
  return modifiedData;
}

async function fetchCSVData() {
  const response = await fetch('/youtube_data.csv');
  const reader = response.body.getReader();
  const result = await reader.read();
  const decoder = new TextDecoder('utf-8');
  const csv = await decoder.decode(result.value);
  return csv;
}

function countDataCategories(jsonData) {
  const createdMonth = {};
  const channelType = {};
  const createdCountry = {};

  jsonData?.forEach(row => {
    const country = row['country'];
    const month = row['created_month'];
    const channel = row['channel_type'];

    createdMonth[month] = createdMonth[month] ? createdMonth[month] + 1 : 1;
    createdCountry[country] = createdCountry[country] ? createdCountry[country] + 1 : 1;
    channelType[channel] = channelType[channel] ? channelType[channel] + 1 : 1;
  });

  return { createdMonth, channelType, createdCountry };
}

const Main = () => {
  const [jsonData, setJsonData] = useState([]);
  const scatterCols = ['country', 'created_month', 'channel_type']
  const [xaxis, setXaxis] = useState(false);
  const [showScatterPlot, setShowScatterPlot] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState('rank');
  const [isSideways, setIsSideways] = useState(false);
  const [selectedData, setSelectedData] = useState([]);
  const [selectedDoubleData, setSelectedDoubleData] = useState([]);
  const [doubleClickedItems, setDoubleClickedItems] = useState('');
  const clickTimeoutRef = useRef(null);

  const { createdMonth, channelType, createdCountry } = countDataCategories(jsonData);
  const data1 = selectedData[0]?.column_name === 'created_month'
    ? createdMonth
    : selectedData[0]?.column_name === 'channel_type'
    ? channelType
    : selectedData[0]?.column_name === 'country'
    ? createdCountry
    : {};

  const handleToggleChange = () => {
    setIsSideways(!isSideways);
  };
  const handleAxisChange = () => {
    setXaxis(!xaxis)
  }

  const handleScatterToggleChange = () => {
    setShowScatterPlot(!showScatterPlot);
  };

  const handleColumnClick = (column_name) => {
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
      clickTimeoutRef.current = null;
      setDoubleClickedItems(prevItems => {
        const isAlreadyAdded = prevItems === column_name;
        return isAlreadyAdded ? '' : column_name;
      });
      setShowScatterPlot(false);
    } else {
      clickTimeoutRef.current = setTimeout(() => {
        setSelectedColumn(column_name);
        clickTimeoutRef.current = null;
      }, 300);
    }
  };

  useEffect(() => {
    setShowScatterPlot(false);
    setIsSideways(false);
    setSelectedData(CUSTOM_COLUMNS.filter(el => el.column_name === selectedColumn));
  }, [selectedColumn]);

  useEffect(() => {
    setSelectedDoubleData(CUSTOM_COLUMNS.filter(el => el.column_name === doubleClickedItems));
  }, [doubleClickedItems]);

  useEffect(() => {
    async function fetchDataEffect() {
      const modifiedData = await fetchData();
      setJsonData(modifiedData);
    }
    fetchDataEffect();
  }, []);

  const backgroundColor = '#cc0000';
  const hoverBackgroundColor = 'white';

  return (
    <div style={{ backgroundColor: 'black' }}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="sticky" style={{ backgroundColor: 'black', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <img src="yt_dark_logo.jpeg" alt="-" width="120" height="120" />
          <h1 style={{ backgroundColor: 'black', color: 'white', marginLeft: '10px' }}>YouTube Video Data</h1>
        </AppBar>
      </Box>
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 6fr' }}>
        <Box
          sx={{
            height: '80vh',
            overflow: 'scroll',
            padding: 1
          }}
        >
          {CUSTOM_COLUMNS.map(({ title, categorical, column_name }) => (
            <Typography key={column_name}>
              <Button
                onClick={() => handleColumnClick(column_name)}
                sx={{
                  width: '180px',
                  backgroundColor: (selectedColumn === column_name || doubleClickedItems === column_name) ? backgroundColor : 'transparent',
                  '&:hover': {
                    backgroundColor: hoverBackgroundColor,
                    cursor: 'pointer',
                    color: 'black'
                  },
                  color: 'white'
                }}
              >
                {title}
              </Button>
            </Typography>
          ))}
        </Box>
        <Box sx={{ display: 'grid', gridTemplateRows: '1fr 8fr' }}>
          <Box sx={{ display: 'flex', justifyContent: 'start', marginRight: '50px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h6" color='white'>
                Show Scatterplot:
              </Typography>
              <Switch
                sx={{
                  '& .MuiSwitch-thumb': {
                    backgroundColor: showScatterPlot ? 'red' : 'white',
                  },
                  '& .MuiSwitch-switchBase.Mui-checked': {
                    color: 'red',
        
                  },
                  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                    backgroundColor: showScatterPlot ? 'red' : 'white',
                  },
                  '& .MuiSwitch-track': {
                    backgroundColor: showScatterPlot ? 'red' : 'white', 
                  },
                  marginRight: '1rem',
                }}
                checked={showScatterPlot}
                onChange={handleScatterToggleChange}
                inputProps={{ 'aria-label': 'toggle scatter plot' }}
                disabled={doubleClickedItems === ''}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', width: '200px' }}>
              <Typography variant="h6" color='white'>
                Graph:
              </Typography>
              <Switch
                checked={isSideways}
                onChange={handleToggleChange}
                inputProps={{ 'aria-label': 'toggle graph orientation' }}
                sx={{
                    '& .MuiSwitch-thumb': {
                        backgroundColor: isSideways ? 'red' : 'white',
                      },
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: 'red',
            
                      },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: isSideways ? 'red' : 'white',
                      },
                      '& .MuiSwitch-track': {
                        backgroundColor: isSideways ? 'red' : 'white', 
                    },
                }}
                disabled={showScatterPlot}
              />
              <Typography variant="body1" style={{ marginLeft: '0.5rem', color: 'white' }}>
                {isSideways ? 'Sideways' : 'Upright'}
              </Typography>
            </div>
          </Box>
          {
            showScatterPlot ? (
                <Box sx={{display: 'flex'}}>
                    <ScatterPlot 
                        xAxisName={xaxis ? selectedDoubleData[0]?.column_name : selectedData[0]?.column_name} 
                        yAxisName={xaxis ? selectedData[0]?.column_name : selectedDoubleData[0]?.column_name} 
                        data={jsonData.map(row => (
                            !xaxis ? [scatterCols.includes(selectedColumn) ? row[selectedData[0]?.ano_col] : row[selectedData[0]?.column_name], scatterCols.includes(doubleClickedItems) ? row[selectedDoubleData[0]?.ano_col] : row[selectedDoubleData[0]?.column_name]]
                            : [scatterCols.includes(doubleClickedItems) ? row[selectedDoubleData[0]?.ano_col] : row[selectedDoubleData[0]?.column_name], scatterCols.includes(selectedColumn) ? row[selectedData[0]?.ano_col] : row[selectedData[0]?.column_name]]
                        ))} 
                        width={800} height={500} 
                    />
                    <div>
                    <h4 style={{color: 'white'}}>X-AXIS - </h4>
                    <div style={{ display: 'flex', flexDirection: 'row'}}>
                        <Typography variant="body1" style={{ marginLeft: '0.5rem', color: 'white' }}>
                            {selectedData[0]?.column_name}
                        </Typography>
                        <Switch
                            checked={xaxis}
                            onChange={handleAxisChange}
                            inputProps={{ 'aria-label': 'axis change' }}
                            sx={{
                                '& .MuiSwitch-thumb': {
                                    backgroundColor: xaxis ? 'red' : 'white',
                                  },
                                  '& .MuiSwitch-switchBase.Mui-checked': {
                                    color: 'red',
                        
                                  },
                                  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                    backgroundColor: xaxis ? 'red' : 'white',
                                  },
                                  '& .MuiSwitch-track': {
                                    backgroundColor: xaxis ? 'red' : 'white', 
                                },
                                marginBottom: '-15px'
                            }}
                        />
                        <Typography variant="body1" style={{ marginLeft: '0.5rem', color: 'white' }}>
                            {selectedDoubleData[0]?.column_name}
                        </Typography>
                        </div>
                    </div>
                </Box>
            ) : selectedData[0]?.categorical ? (
              <BarChart data={data1} width={800} height={500} isSideways={isSideways} xAxisName={!isSideways ? selectedData[0]?.column_name : 'Count'} yAxisName={!isSideways ? 'count' : selectedData[0]?.column_name} />
            ) : (
              <Histogram data={jsonData.map(row => row[selectedData[0]?.column_name])} width={800} height={500} bins={10} isSideways={isSideways} xAxisName={!isSideways ? selectedData[0]?.column_name : 'Count'} yAxisName={!isSideways ? 'count' : selectedData[0]?.column_name} />
            )
          }
        </Box>
      </Box>
    </div>
  );
};

export default Main;
