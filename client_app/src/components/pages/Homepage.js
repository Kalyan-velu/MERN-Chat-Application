import * as React from 'react';
import {Box, styled} from '@mui/system';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import {buttonUnstyledClasses} from '@mui/base/ButtonUnstyled';
import TabUnstyled, {tabUnstyledClasses} from '@mui/base/TabUnstyled';
import Authentication from "./authentication/login";
import {Container, Typography} from "@mui/material";

const blue = {
	50: '#F0F7FF',
	100: '#C2E0FF',
	200: '#80BFFF',
	300: '#66B2FF',
	400: '#3399FF',
	500: '#007FFF',
	600: '#0072E5',
	700: '#0059B2',
	800: '#004C99',
	900: '#003A75',
};

const Tab = styled( TabUnstyled )`
  font-family: IBM Plex Sans, sans-serif;
  color: white;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: bold;
  background-color: transparent;
  width: 100%;
  padding: 12px 16px;
  margin: 6px 6px;
  border: none;
  border-radius: 5px;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: ${blue[400]};
  }

  &:focus {
    color: #fff;
    border-radius: 3px;
    outline: 2px solid ${blue[200]};
    outline-offset: 2px;
  }

  &.${tabUnstyledClasses.selected} {
    background-color: ${blue[50]};
    color: ${blue[600]};
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabPanel = styled( TabPanelUnstyled )`
  width: 100%;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
`;

const TabsList = styled( TabsListUnstyled )`
  min-width: 320px;
  background-color: ${blue[500]};
  border-radius: 8px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
`;

export default function Homepage() {
	return (
		<Container maxWidth="sm" sx={{}}>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					p: 3,
					backgroundColor: "#fff",
					width: '100%',
					m: '40px 0 15px 0',
					borderRadius: '10px',
					borderWidth: '1px'
				}}>
				<Typography variant={'h3'}>Chat Site</Typography>
			</Box>
			<Box sx={{
				backgroundColor: "white",
				width: "100%",
				p: 3,
				borderRadius: "10px",
				borderWidth: "1px"
			}}>
				<TabsUnstyled defaultValue={0}>
					<TabsList>
						<Tab>Log In</Tab>
						<Tab>Register</Tab>
					</TabsList>
					<TabPanel value={0}>{<Authentication/>}</TabPanel>
					<TabPanel value={1}>{<Authentication/>}</TabPanel>

				</TabsUnstyled>
			</Box>
		</Container>
	);
}
