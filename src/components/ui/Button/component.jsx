import React from 'react';

export default function Button(props) {
    let { icon, ...rest } = props;

    if (icon) {
        return (
            <button type="button" {...rest}>
                <i className="material-icons">{icon}</i>
                {rest.children}
            </button>
        );
    } else {
        return (
            <button type="button" {...rest}>
                {rest.children}
            </button>
        );
    }
}