// @mui
import {Grid, Container, Typography} from '@mui/material';
import {useSelector} from "react-redux";
// components
import Page from '../components/Page';
// sections
import {
    AppWidgetSummary,
} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

const generateSummary = (boardData) => {
    const summary = {
        total: 0,
        completed: 0,
        ongoing: 0,
        bugs: 0
    }
    if (!boardData) return summary;
    const parsedBoardData = JSON.parse(boardData);

    summary.total = parsedBoardData.reduce((acc, cur) => acc + cur.cards.length, 0);
    summary.completed = parsedBoardData[3].cards.length;
    summary.ongoing = parsedBoardData[2].cards.length;
    return summary;
}

export default function DashboardApp() {
    const email = useSelector(({user}) => user.details.email)
    const {total, completed, ongoing, bugs} = generateSummary(localStorage.getItem(`kanban-${email}`));

    return (
        <Page title="Dashboard">
            <Container maxWidth="xl">
                <Typography variant="h4" sx={{mb: 5}}>
                    Hi, Welcome back
                </Typography>

                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppWidgetSummary title="Total Tasks" total={total} icon={'icon-park-solid:data-sheet'}/>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <AppWidgetSummary title="Ongoing Tasks Count" total={ongoing} color="warning"
                                          icon={'carbon:list-boxes'}/>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <AppWidgetSummary title="Completed Tasks" total={completed} color="success"
                                          icon={'teenyicons:clipboard-tick-solid'}/>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <AppWidgetSummary title="Bug Count" total={bugs} color="error" icon={'ant-design:bug-filled'}/>
                    </Grid>

                </Grid>
            </Container>
        </Page>
    );
}
