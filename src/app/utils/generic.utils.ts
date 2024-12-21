export const STATUT_RESA_INIT = 0;
export const STATUT_ARRIVEE_CLIENT = 1;
export const STATUT_DEPART_CLIENT = 2;
export const STATUT_PAYE = 3;


export function minutesDiff(begin, end) {
    let differenceValue = (end.getTime() - begin.getTime()) / 1000;
    differenceValue /= 60;
    return Math.abs(Math.round(differenceValue));
}

export function addMinutes(time, minsToAdd) {
    var piece = time.split(':');
    var mins = piece[0] * 60 + +piece[1] + +minsToAdd;

    return D(mins % (24 * 60) / 60 | 0) + ':' + D(mins % 60);
}

export function getRankConteneurList(rank){
    if(rank == 'Hotel'){
        return [
            {key:'Restaurant',value:'Restaurant'},
            {key:'Hotel',value:'Hotel'},
            {key:'SPA',value:'SPA'},
            {key:'Lavage',value:'Lavage'},
            {key:'Location de salle',value:'Location de salle'},
        ]
    }else {

        return [
            {key: 'Restaurant', value: 'Restaurant'},
            {key: 'SPA', value: 'SPA'},
            {key: 'Location de salle', value: 'Location de salle'},
        ]
    }
}

function D(J) {
    return (J < 10 ? '0' : '') + J;
};

export function get_HH_MM(d) {
    const _minutes = d.getMinutes();
    const _hour = d.getHours();
    const minutes = _minutes.toString().length == 1 ? '0' + _minutes : _minutes.toString();
    const hours = _hour.toString().length == 1 ? '0' + _hour : _hour.toString();
    return (hours + ':' + minutes);
}

export function stringToDate(e) {
    if (typeof e.begin == 'string') {
        e.begin = new Date(e.begin + ' ' + e.beginHour + ':00');
        e.end = new Date(e.end + ' ' + e.endHour + ':00');
    }
    return e;
}

export function dateToString(d: Date) {
    return d.toISOString().split('T')[0]
}

export function getObjectFromId(id: number, objects: any[]) {
    return objects.findIndex(x => x.id === id);
}

export function formatPhoneMGA(phone){
    if(phone.length  == 10){}
}

/**
 *
 * @param e :reservation
 */
export function traitReservationText(e) {
    e.eventText = '#' + e.table.nom + ' – ' + e.nbPerson + 'Pers. ' + e.client.civilite + ' ' + e.client.nom + ' ' + e.client.prenom + ' – Tel : ' + formatToPhone(e.client.tel) + ' / : ' + formatToPhone(e.client.tel2);
    return e;
}

/**
 *
 * @param e :reservation
 */
export function leftReservationText(e) {
    return '<div class="width15"><img class="width15" src="'+e.client.pays.flagBase64+'"/></div><div class="ellipsis"><strong>#' + e.table.nom + ' – ' + e.nbPerson + 'P - ' + e.client.civilite + ' ' + e.client.nom + ' ' + e.client.prenom + '</strong></div><div class="ellipsis"> Résa N°' + e.id + ' du ' + (typeof e.begin == 'string' ? e.begin : e.begin.toLocaleDateString()) + '</div><div class="ellipsis">Obs : ' + e.commentaire + '</div>';
}

export function setBgColor(e, colors) {

    switch (e.status) {
        case 0:
            return colors.get('presents');
            break;
        case 1:
            return colors.get('arrivees');
            break;
        case 2:
            return colors.get('departs');
            break;
        case 3:
            return colors.get('reservit');
            break;
    }
}

export function formatToPhone(phone) {
    if (phone == '' || phone == null) {
        return '';
    }
    const input = phone.replace('+261', '0').replace(/\D/g, '').substring(0, 10); // First ten digits of input only
    const areaCode = input.substring(0, 3);
    const middle = input.substring(3, 5);
    const last = input.substring(5, 8);
    const last2 = input.substring(8, 10);
    let returnValue = '';

    if (input.length > 6) {
        returnValue = `${areaCode} ${middle} ${last} ${last2}`;
    } else if (input.length > 3) {
        returnValue = `${areaCode} ${middle}`;
    } else if (input.length > 0) {
        returnValue = `${areaCode}`;
    }
    return returnValue
}

export function calculateNewWidth(e, timelineWidth, step) {
    if (e) {
        e = stringToDate(e);
        e.width = (Math.round(minutesDiff(e.begin, e.end) / Number(step)) * Number(timelineWidth));
        e.tableId = e.table.id;
        return traitReservationText(e);
    } else {
        return e;
    }
}

/**
 *
 * @param e Reservation
 * @param tables
 */
export function traitReservation(e, tables, timelineWidth, timelineHeight, step) {
    const Begin = new Date(e.begin + ' ' + e.beginHour);
    const End = new Date(e.end + ' ' + e.endHour);
    let tableKey = 0;
    if (typeof e.table != 'string') {
        for (let i = 0; i < tables.length; i++) {
            if (tables[i].id == e.table.id) {
                tableKey = i;
                e.table = tables[i];
                break;
            }
        }
    }
    if (typeof e.table == 'string') {

        return {
            id: e.id || 0,
            begin: Begin,
            beginHour: e.beginHour,
            end: End,
            endHour: e.endHour,
            texte: e.texte,
            eventText: '<b>Table ' + e.table.nom + '</b><br />' + e.texte,
            tableId: e.table.id,
            client: Number(e.client.replace('/clients/', '')),
            topPos: (Number(timelineHeight) * (tableKey + 1)) - Number(timelineHeight),
            w: (Math.round(minutesDiff(Begin, End) / Number(step)) * Number(timelineWidth)),
            time: new Date(),
            table: {
                nom: '<strong>' + e.table.nom + '</strong>',
                forme: e.table.forme,
                nbPlace: e.table.nbPlace,
                id: e.table.id,
                couleur: e.table.couleur,
                couleurTexte: e.table.couleurTexte,
                type: e.table.type,
            }
        }
    } else {
        e.eventText = '<b>Table ' + e.table.nom + '</b><br />' + e.texte;
        e.w = (Math.round(minutesDiff(Begin, End) / Number(step)) * Number(timelineWidth));
        e.time = new Date();
        e.topPos = (Number(timelineHeight) * (tableKey + 1)) - Number(timelineHeight);
        e.client = Number(e.client.replace('/clients/', ''));
        e.tableId = e.table.id;
        e.begin = Begin;
        e.end = End;
        return e;
    }
}

export function timeFormat(d) {
    const hours = formatTwooDigits(d.getHours());
    const minutes = formatTwooDigits(d.getMinutes());
    return hours + ":" + minutes;
}

export function formatTwooDigits(n) {
    return n < 10 ? '0' + n : n;
}

export function formatPhoneNumber(phoneNumber): string {
    let phone = phoneNumber.replace(" ", "");
    if (phone.length <= 3) {
        if(phone[0] == '0'){
            phone = '261'+phone.slice(1);
        }
        return phone;
    } else {
        return `+${phone.slice(0, 3)} ${phone.slice(3, 5)} ${phone.slice(5, 7)} ${phone.slice(7, 10)} ${phone.slice(10, 12)}`;
    }
}
