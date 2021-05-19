import React, { forwardRef, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';

import { Modal } from '../Modal';
import { TouchableOpacity } from '../../common/TouchableOpacity';
import { Switch } from '../../common/Switch';

import styles from './styles';

const Filter = ({ title, type, selected, onChange }) => (
  <View style={styles.containerRow}>
    <Text style={styles.optionTitle} numberOfLines={2}>
      {title}
    </Text>
    <Switch
      accessibilityLabel={title}
      value={type === selected}
      onValueChange={() => onChange(type, title)}
    />
  </View>
);

const FilterModal = forwardRef(
  ({ filter, onVisible, onFilter, style }, ref) => {
    const [filters, setFilters] = useState({
      type: filter.type,
      name: filter.name
    });
    const { type = 'popularity.desc' } = filters;

    const changeValues = (type, name) => {
      setFilters({ type, name });
    };

    return (
      <Modal ref={ref} onClose={onVisible} style={style}>
        <View style={styles.containerModal}>
          <Text style={styles.modalTitle}>Filter</Text>
          <ScrollView>
            <View style={styles.containerScroll}>
              <View style={styles.containerSection}>
                <Text style={styles.optionSectionTitle} numberOfLines={2}>
                  Tahun
                </Text>
                <Filter
                  title="Baru dirilis"
                  type="release_date.desc"
                  selected={type}
                  onChange={changeValues}
                />
                <Filter
                  title="Lama"
                  type="release_date.asc"
                  selected={type}
                  onChange={changeValues}
                />
              </View>
              <View style={styles.containerSection}>
                <Text style={styles.optionSectionTitle} numberOfLines={2}>
                  Terpopuler
                </Text>
                <Filter
                  title="Paling populer"
                  type="popularity.desc"
                  selected={type}
                  onChange={changeValues}
                />
                <Filter
                  title="Populer"
                  type="popularity.asc"
                  selected={type}
                  onChange={changeValues}
                />
              </View>
              <View>
                <Text style={styles.optionSectionTitle} numberOfLines={2}>
                  Terbaru
                </Text>
                <Filter
                  title="Paling Terbaru"
                  type="revenue.desc"
                  selected={type}
                  onChange={changeValues}
                />
                <Filter
                  title="Lawas"
                  type="revenue.asc"
                  selected={type}
                  onChange={changeValues}
                />
              </View>
            </View>
          </ScrollView>
          <View style={styles.containerButton}>
            <TouchableOpacity
              style={[styles.button, styles.buttonSave]}
              onPress={() => onFilter(filters)}
            >
              <Text style={[styles.buttonText, styles.buttonTextSave]}>
                Confirm
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
);

export default FilterModal;
