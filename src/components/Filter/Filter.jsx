import PropTypes from 'prop-types';
import {Label, Input} from './Filter.styled'

export const Filter =({filterValue, changeFilter}) => {
    
    return (
                <Label >Find contacts by name
                    <Input type="text"
                        value={filterValue}
                        onChange={changeFilter} />
            </Label>  
        )
    }


Filter.propTypes = {
        filterValue: PropTypes.string.isRequired,
        changeFilter: PropTypes.func,
    }