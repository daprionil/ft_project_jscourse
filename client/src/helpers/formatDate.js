const formatDate = (date) => {
    const newDate = new Date(date);
    const internationalizationDate = new Intl.DateTimeFormat('es-ES', {dateStyle: 'long'});

    return internationalizationDate.format(newDate);
}

export default formatDate;