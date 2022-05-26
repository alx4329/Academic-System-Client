import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const CollapseButton = ({ title, items, onClickAction }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClose = (item) => {
        setAnchorEl(null);
        onClickAction(item.id)
      };
    
    return (
        <>

        <Button 
            onClick={(e)=>setAnchorEl(e.currentTarget)} 
            
            color="inherit">{title}</Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
            >
                {
                    items?.map((item)=>{
                        return <MenuItem onClick={()=>handleClose(item)}>{item.name}</MenuItem>
                    })
                }
            </Menu>
        </>
    )
}

export default CollapseButton;