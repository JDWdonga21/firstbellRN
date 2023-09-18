import React, { useMemo, useState } from 'react';
import RadioGroup, {RadioButtonProps} from 'react-native-radio-buttons-group';

const RadioBtn = ({

}) =>{

    const radioButtons: RadioButtonProps[] = useMemo(() => ([
        {
            id: '1', // acts as primary key, should be unique and non-empty string
            label: '남자',
            value: 'man'
        },
        {
            id: '2',
            label: '여자',
            value: 'woman'
        }
    ]), []);

    const [selectedId, setSelectedId] = useState<string | undefined>();

    return (
        <RadioGroup 
            radioButtons={radioButtons} 
            onPress={setSelectedId}
            selectedId={selectedId}
        />
    );

}
export default RadioBtn