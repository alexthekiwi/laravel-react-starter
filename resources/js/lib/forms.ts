import React from 'react';

interface Props {
    event: React.SyntheticEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >;
    data: Record<string, any>;
    setData: Function;
}

export function handleChange({ event, data, setData }: Props) {
    if (!Object.keys(data).includes(event.currentTarget.name)) {
        return;
    }

    setData(
        event.currentTarget.name,
        event.currentTarget.type === 'checkbox' ||
            event.currentTarget.type === 'radio'
            ? // @ts-ignore
              event.currentTarget.checked
            : event.currentTarget.value
    );
}
