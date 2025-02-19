export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
}

export const getNameString = (person) => {
    if (!person) {
        return "Not specified.";
    }

    let name = "";

    if (person.first_name) {
        name += person.first_name + " ";
    }

    if (person.last_name) {
        name += person.last_name;
    }

    if (name === "") {
        name = "Not specified."
    }

    return name
}