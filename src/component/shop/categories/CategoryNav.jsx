import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        direction: "rtl",
    },
}));

export default function CategoryNav({ categories, handelCategoryClick, onSearchActive }) {
    const classes = useStyles();

    const [value, setValue] = useState(1);

    useEffect(() => {
        if (onSearchActive) {
            setValue(0);
        }
    }, [onSearchActive])

    
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <div className={classes.root} >
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    {categories.map(category => {
                        return <Tab
                            key={category.id}
                            value={category.id}
                            label={category.name}
                            onClick={() => handelCategoryClick(category.id)}
                        />;
                    })}
                </Tabs>
            </AppBar>
        </div>
    );
}