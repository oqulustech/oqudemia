import React from 'react';
import Grid from '@mui/material/Grid';
const ComponentPage: React.FC = () => (
				<Grid container spacing={2} justifyContent="center">
					<Grid item xs={12} sm={10} md={8} lg={6} xl={4}>
						<div>
							<h2>Component</h2>
							<p>This is the Component page.</p>
						</div>
					</Grid>
				</Grid>
);
export default ComponentPage;
