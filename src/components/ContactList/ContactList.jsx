import PropTypes from 'prop-types';
import {List, ListItem, Button} from './ContactList.styled'

export const ContactList = ({listItems, onDelete}) => {
    return (
        <>
            <List>
                {listItems.length > 0 && (listItems.map((listItem) => (
                    <ListItem key={listItem.id}><span>{listItem.name}: {listItem.number}</span>
                        <Button type='button' onClick={() => onDelete(listItem.id)}>Delete</Button>
                    </ListItem>
            )))}
                </List>
        </>
        
    )
}

ContactList.propTypes = {
    listItems: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
    ),
    onDelete: PropTypes.func,
}