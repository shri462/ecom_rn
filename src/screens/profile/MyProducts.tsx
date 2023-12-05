import {StyleSheet, View} from 'react-native';
import React from 'react';
import {DataTable, Text} from 'react-native-paper';
import _ from '../../styles/utilityStyles';
import {useAppSelector} from '../../data/hooks/hooks';

const MyProducts = () => {
  const [page, setPage] = React.useState<number>(0);
  const [numberOfItemsPerPageList] = React.useState([5, 10, 15]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0],
  );
  const {myProducts} = useAppSelector(state => state.product);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, myProducts.length);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);
  return (
    <View>
      <Text style={[_.mt_16]} variant="titleLarge">
        Your Products
      </Text>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Brand</DataTable.Title>
          <DataTable.Title>Name</DataTable.Title>
          <DataTable.Title numeric>Price</DataTable.Title>
          <DataTable.Title numeric>Sizes</DataTable.Title>
        </DataTable.Header>

        {myProducts.slice(from, to).map(item => (
          <DataTable.Row key={item.$id}>
            <DataTable.Cell>{item.brandName}</DataTable.Cell>
            <DataTable.Cell>{item.name}</DataTable.Cell>
            <DataTable.Cell numeric>₹ {item.price}</DataTable.Cell>
            <DataTable.Cell numeric>{item.sizes?.join(', ')}</DataTable.Cell>
          </DataTable.Row>
        ))}

        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(myProducts.length / itemsPerPage)}
          onPageChange={page => setPage(page)}
          label={`${from + 1}-${to} of ${myProducts.length}`}
          numberOfItemsPerPageList={numberOfItemsPerPageList}
          numberOfItemsPerPage={itemsPerPage}
          onItemsPerPageChange={onItemsPerPageChange}
          showFastPaginationControls
          selectPageDropdownLabel={'Rows per page'}
        />
      </DataTable>
    </View>
  );
};

export default MyProducts;

const styles = StyleSheet.create({});
