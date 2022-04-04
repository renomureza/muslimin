import Checkbox from "../../components/Checkbox";
import Label from "../../components/Label";
import Modal from "../../components/Modal";
import Select from "../../components/Select";
import { usePreference } from "../../context/Preference";

const ModalPreference = ({ mufassirs, qaris, onClose }) => {
  const {
    state: { isShownTafsir, isShownTranslation, mufassir, qari },
    toggleShownTafsir,
    setMufassir,
    setQari,
    toggleShownTranslation,
  } = usePreference();

  return (
    <Modal onClose={onClose} title="Preferensi">
      <div className="flex flex-col gap-4 p-4">
        <Select label="Qari" onChange={setQari} value={qari}>
          {qaris.map(({ value, title }) => (
            <Select.Option key={value} value={value}>
              {title}
            </Select.Option>
          ))}
        </Select>
        <Select label="Tafsir" value={mufassir} onChange={setMufassir}>
          {mufassirs.map(({ value, title }) => (
            <Select.Option key={value} value={value}>
              {title}
            </Select.Option>
          ))}
        </Select>
        <div className="flex gap-4">
          <div className="flex gap-3 items-center">
            <Label htmlFor="tafsir">Tafsir</Label>
            <Checkbox
              checked={isShownTafsir}
              onChange={toggleShownTafsir}
              id="tafsir"
              name="tafsir"
            />
          </div>
          <div className="flex gap-3 items-center">
            <Label htmlFor="translation">Terjemahan</Label>
            <Checkbox
              name="translation"
              label="Terjemahan"
              id="translation"
              onChange={toggleShownTranslation}
              checked={isShownTranslation}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalPreference;
