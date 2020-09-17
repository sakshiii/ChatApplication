//manage users joining , signing , managing ,using helper function

const users = [];

const addUser = ({id,name,room}) =>{

// trimming to remove extra space like if fawad khan -> fawadkhan
    name=name.trim().toLowerCase();
    room=room.trim().toLowerCase();

    const existingUser = users.find((user) => user.room === room && user.name===name )

    //if user is existing it will be returned from here only
    if(existingUser)
    {
            return {error: 'userName is taken'}
    }
    const user ={ id,name,room};
    users.push(user);

    return {user};
}

const removeUser = () =>{
    
    //because we only need the id to delete that user
    const index=users.findIndex((user)=>user.id===id);
    //if id exists then only u can delete
    if(index!=-1)
    {
        // why did we do splice(..)"[0]"?
        return users.splice(index,1)[0];

    }
}

//it will automatically return if user is present and even after removeing the parenthesis it will work the same
const getUser = (id) => (users.find((user)=>user.id===id))

//like this by removing parenthesis
//to return every user having room
const getUsersInRoom = (room) => users.filter((user)=>user.room===room)

module.exports= {addUser,removeUser,getUser,getUsersInRoom};
