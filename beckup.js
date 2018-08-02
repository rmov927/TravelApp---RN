<View style={styles.mainViewWhen}>
<Tabs
  locked={true}
  tabBarUnderlineStyle={{ backgroundColor: '#1976D2' }}
  style={{ backgroundColor: 'white' }}>

  <Tab
    heading="Anytime"
    tabStyle={styles.tabModal}
    textStyle={styles.textStyleWhenModal}
    activeTabStyle={styles.activeTabStyleWhenModal}
    activeTextStyle={[
      styles.activeTextStyleWhenModal,
      { fontSize: Platform.OS === 'ios' ? 10 : 10 },
    ]}>

    <View
      style={{
        flex: 1,
      }}>
      <View style={styles.containerWhenModal}>
        <View style={styles.whenOneWayConStyle}>
          <Text style={styles.whenOneWayTextStyle}>
            One way
      </Text>
        </View>
        <View style={styles.switchStyle}>

          <Switch
            onValueChange={(value) => {
              !this.setState({ toggled: value },
                this.setState({ whenText: this.state.whenText + ' Flexible-Return' })
              )
            }}
            value={this.state.toggled}
            style={styles.whenSwitchStyle}
            onTintColor="#90caf9"
            buttonSize={30}
            thumbTintColor="#2394ee"
          />

        </View>
        <View style={styles.whenReturnWhenStyle}>
          <Text style={styles.whenReturnTextStyle}>
            Return
      </Text>
        </View>
      </View>

      <View style={styles.btnCancelApply}>

        <TouchableOpacity style={styles.btnCancel}
          onPress={() => this.closeWhenModal()}>
          <Text style={styles.btnCancelText}>CANCEL</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnApply}
          onPress={() => this.closeWhenModal()}>
          <Text style={styles.btnApplyText}>APPLY</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Tab>
  <Tab
    heading="Flexible"
    tabStyle={styles.tabModal}
    textStyle={styles.textStyleWhenModal}
    activeTabStyle={styles.activeTabStyleWhenModal}
    activeTextStyle={[
      styles.activeTextStyleWhenModal,
      { fontSize: Platform.OS === 'ios' ? 10 : 10 },
    ]}>

    <View
      style={{
        flex: 1,
        margin: 0,
      }}>
      <View style={styles.containerWhenModal}>
        <View style={styles.whenOneWayConStyle}>
          <Text style={styles.whenOneWayTextStyle}>
            One way
      </Text>
        </View>
        <View style={styles.switchStyle}>

          <Switch
            onValueChange={(value) => !this.setState({ toggled: value })}
            value={this.state.toggled}
            style={styles.whenSwitchStyle}
            onTintColor="#90caf9"
            thumbTintColor="#2394ee"
          />

        </View>
        <View style={styles.whenReturnWhenStyle}>
          <Text style={styles.whenReturnTextStyle}>
            Return
      </Text>
        </View>
      </View>

      <View style={styles.flexibleCon}>

        {/* {
      let i=0,
      btnMonth.map((item,index)=>{
        
        

        return(
          
          <View style={styles.monthRow}>
            <TouchableOpacity key={index} style={styles.monthCol} onPress={()=>this._btnMounthClick(index)}>
              <Text style={styles.monthText}>{item}</Text>
            </TouchableOpacity>
          </View>
        )
      })
    } */}
        <View style={styles.monthRow}>
          <TouchableOpacity style={this.state.monSelect.indexOf('APR') > -1 ? styles.monthColSelect : btnMonth.indexOf('APR') >= month ? styles.monthCol : styles.monthColDis} onPress={() => this.btnClickMon(btnMonth[3])} disabled={btnMonth.indexOf('APR') >= month ? false : true}>
            <Text style={styles.monthText}>APR</Text>
          </TouchableOpacity>
          <TouchableOpacity style={this.state.monSelect.indexOf('MAY') > -1 ? styles.monthColSelect : btnMonth.indexOf('MAY') >= month ? styles.monthCol : styles.monthColDis} onPress={() => this.btnClickMon(btnMonth[4])} disabled={btnMonth.indexOf('MAY') >= month ? false : true}>
            <Text style={styles.monthText}>MAY</Text>
          </TouchableOpacity>
          <TouchableOpacity style={this.state.monSelect.indexOf('JUN') > -1 ? styles.monthColSelect : btnMonth.indexOf('JUN') >= month ? styles.monthCol : styles.monthColDis} onPress={() => this.btnClickMon(btnMonth[5])} disabled={btnMonth.indexOf('JUN') >= month ? false : true}>
            <Text style={styles.monthText}>JUN</Text>
          </TouchableOpacity>
          <TouchableOpacity style={this.state.monSelect.indexOf('JUL') > -1 ? styles.monthColSelect : btnMonth.indexOf('JUL') >= month ? styles.monthCol : styles.monthColDis} onPress={() => this.btnClickMon(btnMonth[6])} disabled={btnMonth.indexOf('JUL') >= month ? false : true}>
            <Text style={styles.monthText}>JUL</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.monthRow}>

          
          <TouchableOpacity style={this.state.monSelect.indexOf('AUG') > -1 ? styles.monthColSelect : btnMonth.indexOf('AUG') >= month ? styles.monthCol : styles.monthColDis} onPress={() => this.btnClickMon(btnMonth[7])} disabled={btnMonth.indexOf('AUG') >= month ? false : true}>
            <Text style={styles.monthText}>AUG</Text>
          </TouchableOpacity>
          <TouchableOpacity style={this.state.monSelect.indexOf('SEP') > -1 ? styles.monthColSelect : btnMonth.indexOf('SEP') >= month ? styles.monthCol : styles.monthColDis} onPress={() => this.btnClickMon(btnMonth[8])} disabled={btnMonth.indexOf('SEP') >= month ? false : true}>
            <Text style={styles.monthText}>SEP</Text>
          </TouchableOpacity>
          <TouchableOpacity style={this.state.monSelect.indexOf('OCT') > -1 ? styles.monthColSelect : btnMonth.indexOf('OCT') >= month ? styles.monthCol : styles.monthColDis} onPress={() => this.btnClickMon(btnMonth[9])} disabled={btnMonth.indexOf('OCT') >= month ? false : true}>
            <Text style={styles.monthText}>OCT</Text>
          </TouchableOpacity>
          <TouchableOpacity style={this.state.monSelect.indexOf('NOV') > -1 ? styles.monthColSelect : btnMonth.indexOf('NOV') >= month ? styles.monthCol : styles.monthColDis} onPress={() => this.btnClickMon(btnMonth[10])} disabled={btnMonth.indexOf('NOV') >= month ? false : true}>
            <Text style={styles.monthText}>NOV</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.monthRow}>

          
          <TouchableOpacity style={this.state.monSelect.indexOf('DEC') > -1 ? styles.monthColSelect : btnMonth.indexOf('DEC') >= month ? styles.monthCol : styles.monthColDis} onPress={() => this.btnClickMon(btnMonth[11])} disabled={btnMonth.indexOf('DEC') >= month ? false : true}>
            <Text style={styles.monthText}>DEC</Text>
          </TouchableOpacity>
          <TouchableOpacity style={this.state.monSelect.indexOf('JAN') > -1 ? styles.monthColSelect : btnMonth.indexOf('JAN') >= month ? styles.monthCol : styles.monthCol} onPress={() => this.btnClickMon(btnMonth[0])} disabled={btnMonth.indexOf('JAN') >= month ? false : false}>
            <Text style={styles.monthText}>JAN</Text>
          </TouchableOpacity>
          <TouchableOpacity style={this.state.monSelect.indexOf('FEB') > -1 ? styles.monthColSelect : btnMonth.indexOf('FEB') >= month ? styles.monthCol : styles.monthCol} onPress={() => this.btnClickMon(btnMonth[1])} disabled={btnMonth.indexOf('FEB') >= month ? false : false}>
            <Text style={styles.monthText}>FEB</Text>
          </TouchableOpacity>
          <TouchableOpacity style={this.state.monSelect.indexOf('MAR') > -1 ? styles.monthColSelect : btnMonth.indexOf('MAR') >= month ? styles.monthCol : styles.monthCol} onPress={() => this.btnClickMon(btnMonth[2])} >
            <Text style={styles.monthText}>MAR</Text>
          </TouchableOpacity>
        </View>

      </View>

      {
        this.toggleActions()
      }


      <View style={styles.hr} />

      <View style={styles.btnCancelApply}>

        <TouchableOpacity style={styles.btnCancel}
          onPress={() => this.closeWhenModal()}>
          <Text style={styles.btnCancelText}>CANCEL</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnApply}
          onPress={() => this.closeWhenModal()}>
          <Text style={styles.btnApplyText}>APPLY</Text>
        </TouchableOpacity>
      </View>
    </View>

  </Tab>
  <Tab
    heading="Date range"
    tabStyle={styles.tabModal}
    textStyle={styles.textStyleWhenModal}
    activeTabStyle={styles.activeTabStyleWhenModal}
    activeTextStyle={[
      styles.activeTextStyleWhenModal,
      { fontSize: Platform.OS === 'ios' ? 10 : 10 },
    ]}>

    <View
      style={{
        flex: 1,
        margin: 0,
      }}>
      <View style={styles.containerWhenModal}>
        <View style={styles.whenOneWayConStyle}>
          <Text style={styles.whenOneWayTextStyle}>
            One way
      </Text>
        </View>
        <View style={styles.switchStyle}>

          <Switch
            onValueChange={(value) => !this.setState({ toggled: value })}
            value={this.state.toggled}
            style={styles.whenSwitchStyle}
            onTintColor="#90caf9"
            thumbTintColor="#2394ee"
            thumbSize={10}

          />

        </View>
        <View style={styles.whenReturnWhenStyle}>
          <Text style={styles.whenReturnTextStyle}>
            Return
      </Text>
        </View>
      </View>


      {this.toggleActions()}

      {this.toogleButtons()}


      <View style={styles.hr} />

      <View style={styles.btnCancelApply}>

        <TouchableOpacity style={styles.btnCancel}
          onPress={() => this.closeWhenModal()}>
          <Text style={styles.btnCancelText}>CANCEL</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnApply}
          onPress={() => this.closeWhenModal()}>
          <Text style={styles.btnApplyText}>APPLY</Text>
        </TouchableOpacity>
      </View>
    </View>

  </Tab>
  <Tab
    heading="Specific dates"
    tabStyle={styles.tabModal}
    textStyle={styles.textStyleWhenModal}
    activeTabStyle={styles.activeTabStyleWhenModal}
    activeTextStyle={[
      styles.activeTextStyleWhenModal,
      { fontSize: Platform.OS === 'ios' ? 10 : 10 },
    ]}>
    <View
      style={{
        flex: 1,
        margin: 0,
      }}>
      <View style={styles.containerWhenModal}>
        <View style={styles.whenOneWayConStyle}>
          <Text style={styles.whenOneWayTextStyle}>
            One way
      </Text>
        </View>
        <View style={styles.switchStyle}>

          <Switch
            onValueChange={(value) => !this.setState({ toggled: value })}
            value={this.state.toggled}
            style={styles.whenSwitchStyle}
            onTintColor="#90caf9"
            thumbTintColor="#2394ee"
            thumbSize={10}

          />

        </View>
        <View style={styles.whenReturnWhenStyle}>
          <Text style={styles.whenReturnTextStyle}>
            Return
          </Text>
        </View>
      </View>



      {
        this.toogleButtonsSpecial()
      }


      <View style={styles.hr} />

      <View style={styles.btnCancelApply}>

        <TouchableOpacity style={styles.btnCancel}
          onPress={() => this.closeWhenModal()}>
          <Text style={styles.btnCancelText}>CANCEL</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnApply}
          onPress={() => this.closeWhenModal()}>
          <Text style={styles.btnApplyText}>APPLY</Text>
        </TouchableOpacity>
      </View>
    </View>


  </Tab>
</Tabs>

</View>