// material
import {Container, Stack, Typography} from '@mui/material';
// components
import Page from '../components/Page';
// mock
import Tasks from "./Tasks";

// ----------------------------------------------------------------------

export default function Board() {
    return (
        <Page title="Dashboard: Board">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Tasks
                    </Typography>
                </Stack>
                <Tasks/>
            </Container>
        </Page>
    );
}
