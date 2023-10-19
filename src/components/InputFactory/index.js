// import React from 'react';
// import {
//     InputRelation,
//     InputString,
//     InputPassword,
//     InputNumber,
//     InputText,
//     Checkbox,
//     InputJson,
//     InputImage,
//     InputFile,
//     InputPointer,
//     InputSelect,
// } from "nq-component";
// import {findObjectUseCase} from "../../usecases/object";
// import {saveFileUseCase, saveImageUseCase} from "../../usecases/file";
// import Context from "../../AppContext";

// const findObject = findObjectUseCase();
// const saveImage = saveImageUseCase();
// const saveFile = saveFileUseCase();
// const defaultProps = {
//     object: {}
// }

// function InputFactory(props) {
//     const {type, _type, field, object, schemas, ...options} = props;
//     const context = React.useContext(Context);
//     const value = object[field];
//     switch (_type || type) {
//         case 'Email':
//         case 'String':
//             return <InputString
//                 type={type.toLowerCase()}
//                 defaultValue={value}
//                 {...options}/>;
//         case 'Date':
//             return <InputString
//                 type={type.toLowerCase()}
//                 {...options}/>;
//         case 'Password':
//             return <InputPassword
//                 {...options}/>;
//         case 'Number':
//         case 'Tel':
//             return <InputNumber
//                 defaultValue={value}
//                 {...options}/>;

//         case 'Text':
//             return <InputText
//                 field={field}
//                 type={type.toLowerCase()}
//                 object={object}
//                 {...options}/>;
//         case 'Relation':
//             return <InputRelation
//                 defaultValue={value}
//                 isMulti={type === 'Relation'}
//                 schema={options.schema || (schemas || context.schemas).find(s => s.collection === options.target)}
//                 find={findObject}
//                 {...options}/>;
//         case 'Pointer':
//             return <InputPointer
//                 defaultValue={value}
//                 schema={options.schema || (schemas || context.schemas).find(s => s.collection === options.target)}
//                 find={findObject}
//                 {...options}/>;
//         case 'Image':
//             return <InputImage
//                 value={value}
//                 save={saveImage}
//                 {...options}/>;
//         case 'File':
//             return <InputFile
//                 value={value}
//                 save={saveFile}
//                 {...options}/>;
//         case 'Boolean':
//             return <Checkbox
//                 defaultChecked={value}
//                 id={object.id}
//                 {...options}/>;
//         case 'Object':
//         case 'Array':
//             return <InputJson
//                 id={object.id}
//                 defaultValue={JSON.stringify(value, null, 4) || ''}
//                 {...options}/>;
//         case 'Enum':
//             return <InputSelect
//                 type={type.toLowerCase()}
//                 options={options.options}
//                 {...options}/>;
//         default:
//             return null;
//     }
// }

// InputFactory.defaultProps = defaultProps;
// export default InputFactory;


// import React from 'react';
// import {InputFactory as Factory, RelatedFactory} from "nq-component";
// import {findObjectUseCase, saveObjectUseCase} from "../../usecases/object";
// import {saveFileUseCase, saveImageUseCase} from "../../usecases/file";
// import InputPoint from "../InputPoint";
// import Context from "../../AppContext";

// const defaultProps = {}

// function InputFactory({type, _type, field, object, onChange, ...props}) {
//     const context = React.useContext(Context);
//     const value = object && object[field];
  
//     function _onChange(field, value) {
//         if (object) {
//             object[field] = value;
//         }
//         onChange(value, field);
//     }

//     switch (_type || type) {
//         case 'Point':
//             return <InputPoint
//                 defaultValue={value}
//                 onChange={_onChange.bind(this, field)}/>
//         case 'Related':
//             return <RelatedFactory
//                 defaultValue={value}
//                 onChange={_onChange.bind(this, field)}
//                 schema={props.schema || context.schemas.find(s => s.collection === props.target)}
//                 schemas={context.schemas}
//                 field={field}
//                 {...props}/>;
//         default:
//             return <Factory
//                 type={type}
//                 _type={_type}
//                 field={field}
//                 object={object}
//                 schemas={context.schemas}
//                 onChange={onChange}
//                 findObject={findObjectUseCase()}
//                 saveObject={saveObjectUseCase()}
//                 saveImage={saveImageUseCase()}
//                 saveFile={saveFileUseCase()}
//                 {...props}/>
//     }

// }

// InputFactory.defaultProps = defaultProps;
// export default InputFactory;

import React from "react";
import {
  InputRelation,
  InputString,
  InputPassword,
  InputNumber,
  InputText,
  Checkbox,
  InputJson,
  InputImage,
  InputFile,
  InputSignature,
  InputPointer,
  InputSelect,
} from "nq-component";
import { findObjectUseCase } from "../../usecases/object";
import { saveFileUseCase, saveImageUseCase } from "../../usecases/file";
import Context from "../../AppContext";
// import InputIcon from "../InputIcon";

const findObject = findObjectUseCase();
const saveImage = saveImageUseCase();
const saveFile = saveFileUseCase();
const defaultProps = {};

function InputFactory({
  type,
  _type,
  field,
  object,
  schemas,
  hidden,
  required,
  onChange,
  ...props
}) {
  const context = React.useContext(Context);
  const value = object && object[field];

  function _onChange(field, value) {
    if (object) {
      object[field] = value;
    }
    onChange(value, field);
  }

  switch (_type || type) {
    case "Email":
    case "String":
      return (
        <InputString
          defaultValue={value}
          onChange={_onChange.bind(this, field)}
          type={type.toLowerCase()}
          required={required}
          {...props}
        />
      );
    case "Date":
      return (
        <InputString
          defaultValue={value && value.slice(0, 10)}
          onChange={_onChange.bind(this, field)}
          type={type.toLowerCase()}
          required={required}
          {...props}
        />
      );
    case "Password":
      return (
        <InputPassword onChange={_onChange.bind(this, field)} {...props} />
      );
    case "Number":
    case "Tel":
      return (
        <InputNumber
          defaultValue={value}
          onChange={_onChange.bind(this, field)}
          required={required}
          {...props}
        />
      );
    case "Text":
      return (
        <InputText
          defaultValue={value}
          onChange={_onChange.bind(this, field)}
          required={required}
          {...props}
        />
      );
    case "Relation":
      return (
        <InputRelation
          defaultValue={value}
          onChange={_onChange.bind(this, field)}
          isMulti={type === "Relation"}
          schema={
            props.schema ||
            (schemas || context.schemas).find(
              (s) => s.collection === props.target
            )
          }
          find={findObject}
          required={required}
          {...props}
        />
      );
    case "Pointer":
      return field === "user" ? (
        <InputString
          defaultValue={value?.name}
          onChange={_onChange.bind(this, field)}
          type={type.toLowerCase()}
          required={required}
          {...props}
        />
      ) : (
        <InputPointer
          defaultValue={value}
          onChange={_onChange.bind(this, field)}
          schema={
            props.schema ||
            (schemas || context.schemas).find(
              (s) => s.collection === props.target
            )
          }
          find={findObject}
          required={required}
          disabled={true}
          {...props}
        />
      );
    case "Image":
      return (
        <InputImage
          value={value}
          onChange={_onChange.bind(this, field)}
          save={saveImage}
          required={required}
          {...props}
        />
      );
    case "File":
      return (
        <InputFile
          value={value}
          onChange={_onChange.bind(this, field)}
          save={saveFile}
          required={required}
          {...props}
        />
      );
    case "Signature":
      return (
        <InputSignature
          value={value}
          onChange={_onChange.bind(this, field)}
          save={saveFile}
          required={required}
          {...props}
        />
      );
    case "Boolean":
      return (
        <Checkbox
          defaultChecked={value}
          onChange={_onChange.bind(this, field)}
          id={field}
          required={required}
          {...props}
        />
      );
    case "Object":
    case "Array":
      return (
        <InputJson
          defaultValue={value}
          onChange={_onChange.bind(this, field)}
          id={object.id}
          required={required}
          {...props}
        />
      );
    case "Enum":
      return (
        <InputSelect
          defaultValue={value}
          onChange={_onChange.bind(this, field)}
          type={type.toLowerCase()}
          options={props.options}
          label={
            (props.dynamic ? "Select of type " : "Select ") + (field || "")
          }
          required={required}
          {...props}
        />
      );
    // case "Icon":
    //   return (
    //     <InputIcon
    //       defaultValue={value}
    //       onChange={_onChange.bind(this, field)}
    //       options={props.options}
    //       required={required}
    //       {...props}
    //     />
    //   );
    default:
      return null;
  }
}

InputFactory.defaultProps = defaultProps;
export default InputFactory;